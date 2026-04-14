import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB, getJobsDB, getCompaniesDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import jobRoutes from "./routes/jobs.js";
import companyRoutes from "./routes/companies.js";
import adminRoutes from "./routes/adminRoutes.js";
import { startAutoSync } from "./services/jobAggregator.js";
import { startCompanyAutoSync } from "./services/companyAggregator.js";  // ← NEW

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'http://localhost:8080',
    'http://localhost:5173',
    'https://placement-portal-ares.onrender.com',
    'https://placement-portal-sand.vercel.app'
  ],
  credentials: true
}));
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/admin", adminRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running", timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ 
    success: false, 
    error: err.message || "Internal server error" 
  });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  
  // Start automatic job sync
  try {
    const jobsDb = await getJobsDB();
    startAutoSync(jobsDb);
    console.log("✅ Job aggregator initialized");
  } catch (error) {
    console.error("❌ Failed to start job aggregator:", error.message);
  }

  // Start automatic company sync (NEW!)
  try {
    const jobsDb = await getJobsDB();
    const companiesDb = await getCompaniesDB();
    startCompanyAutoSync(jobsDb, companiesDb);
    console.log("✅ Company aggregator initialized");
  } catch (error) {
    console.error("❌ Failed to start company aggregator:", error.message);
  }
});