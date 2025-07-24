// src/websocket/WebSocketManager.js
import { io } from "socket.io-client";

class WebSocketManager {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.subscribers = new Map();
    this.connectionPromise = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 3;
    this.baseUrl = "https://freelikes.org";
    this.socketPath = "/yt-api/socket.io/";
  }

  async connect() {
    // Return existing connection promise if already connecting
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    // Return immediately if already connected
    if (this.isConnected && this.socket) {
      return Promise.resolve();
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      try {
        // Clean up existing connection
        if (this.socket) {
          this.socket.disconnect();
        }

        const socketOptions = {
          path: this.socketPath,
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          maxReconnectionAttempts: this.maxReconnectAttempts,
          timeout: 10000,
          forceNew: true,
          transports: ["websocket", "polling"],
          withCredentials: true,
          autoConnect: true,
        };

        // Determine connection URL based on environment
        let connectionUrl = this.baseUrl;

        // For Netlify and other hosted environments
        if (typeof window !== "undefined") {
          const { protocol, hostname } = window.location;

          // Use secure connection for HTTPS sites
          if (
            protocol === "https:" ||
            hostname.includes("netlify.app") ||
            hostname.includes("freelikes.org")
          ) {
            connectionUrl = this.baseUrl;
          }
        }

        console.log("Connecting WebSocket to:", connectionUrl);
        this.socket = io(connectionUrl, socketOptions);

        this.socket.on("connect", () => {
          console.log("WebSocket connected:", this.socket.id);
          this.isConnected = true;
          this.reconnectAttempts = 0;
          this.connectionPromise = null;
          resolve();
        });

        this.socket.on("disconnect", (reason) => {
          console.log("WebSocket disconnected:", reason);
          this.isConnected = false;
          this.connectionPromise = null;

          // Notify all subscribers about disconnection
          this.subscribers.forEach((callback) => {
            callback({ status: "disconnected", reason });
          });
        });

        this.socket.on("job-update", (jobData) => {
          console.log("Job update received:", jobData);
          const callback = this.subscribers.get(jobData.id);
          if (callback) {
            callback(jobData);
          }
        });

        this.socket.on("connect_error", (error) => {
          console.error("WebSocket connection error:", error);
          this.isConnected = false;
          this.connectionPromise = null;
          this.reconnectAttempts++;

          if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            reject(
              new Error(
                `Failed to connect after ${this.maxReconnectAttempts} attempts`,
              ),
            );
          }
        });

        // Connection timeout
        setTimeout(() => {
          if (!this.isConnected) {
            this.connectionPromise = null;
            reject(new Error("WebSocket connection timeout"));
          }
        }, 10000);
      } catch (error) {
        console.error("WebSocket initialization failed:", error);
        this.connectionPromise = null;
        reject(error);
      }
    });

    return this.connectionPromise;
  }

  disconnect() {
    if (this.socket) {
      // Unsubscribe from all jobs
      this.subscribers.forEach((callback, jobId) => {
        this.unsubscribeFromJob(jobId);
      });

      this.socket.disconnect();
      this.socket = null;
    }

    this.isConnected = false;
    this.connectionPromise = null;
    this.subscribers.clear();
    console.log("WebSocket disconnected gracefully");
  }

  async subscribeToJob(jobId, callback) {
    try {
      await this.connect();

      if (this.isConnected && this.socket) {
        this.subscribers.set(jobId, callback);
        this.socket.emit("subscribe-job", jobId);
        console.log("Subscribed to job:", jobId);
        return true;
      }
    } catch (error) {
      console.error("Failed to subscribe to job:", error);
    }

    return false;
  }

  unsubscribeFromJob(jobId) {
    if (this.isConnected && this.socket) {
      this.socket.emit("unsubscribe-job", jobId);
      console.log("Unsubscribed from job:", jobId);
    }

    this.subscribers.delete(jobId);
  }

  isConnectedToSocket() {
    return this.isConnected && this.socket?.connected;
  }
}

// Create singleton instance
const webSocketManager = new WebSocketManager();

export default webSocketManager;
