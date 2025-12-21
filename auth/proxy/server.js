const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Kratos backend URL
const KRATOS_URL = process.env.KRATOS_URL || "http://kratos:4433";

// Enable CORS with credentials support
app.use(cors({
    origin: [
        "http://localhost:8081",
        "http://192.168.1.67:8081",
        "http://localhost:19006",
        "http://localhost:19000"
    ],
    credentials: true, // CRITICAL: Must be true to send/receive cookies
    exposedHeaders: ["Set-Cookie"],
}));

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

// Proxy all /kratos/* requests to Kratos
app.use("/kratos", createProxyMiddleware({
    target: KRATOS_URL,
    changeOrigin: true,
    pathRewrite: { "^/kratos": "" },
    onProxyReq: (proxyReq, req, res) => {
        // Forward cookies from browser to Kratos
        if (req.headers.cookie) {
            proxyReq.setHeader("cookie", req.headers.cookie);
        }
    },
    onProxyRes: (proxyRes, req, res) => {
        // Log for debugging
        console.log(`[Proxy] ${req.method} ${req.path} -> ${proxyRes.statusCode}`);

        // Forward Set-Cookie headers from Kratos to browser
        if (proxyRes.headers["set-cookie"]) {
            res.setHeader("set-cookie", proxyRes.headers["set-cookie"]);
        }
    },
    onError: (err, req, res) => {
        console.error("[Proxy Error]", err.message);
        res.status(502).json({ error: "Proxy error", message: err.message });
    },
}));

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Auth proxy running on http://localhost:${PORT}`);
    console.log(`Proxying /kratos/* -> ${KRATOS_URL}`);
});