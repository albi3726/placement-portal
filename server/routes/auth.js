import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "../config/db.js";
import { generateVerificationCode, sendVerificationEmail } from "../utils/email.js";

const router = express.Router();

// Signup Route with Email Verification
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({ 
        success: false, 
        error: "All fields are required" 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        error: "Password must be at least 6 characters" 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid email format" 
      });
    }

    const db = await connectDB();
    const usersCollection = db.collection("Placement student");

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        error: "Email already registered" 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate verification code
    const verificationCode = generateVerificationCode();
    const codeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create new user (unverified)
    const newUser = {
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name.trim(),
      isVerified: false,
      verificationCode,
      verificationCodeExpiry: codeExpiry,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await usersCollection.insertOne(newUser);

    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationCode, name);
    
    if (!emailResult.success) {
      // If email fails, delete the user and return error
      await usersCollection.deleteOne({ _id: result.insertedId });
      return res.status(500).json({
        success: false,
        error: "Failed to send verification email. Please try again."
      });
    }

    res.status(201).json({
      success: true,
      message: "Signup successful! Please check your email for verification code.",
      userId: result.insertedId,
      email: newUser.email
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Signup failed. Please try again." 
    });
  }
});

// Verify Email Route
router.post("/verify-email", async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        error: "Email and verification code are required"
      });
    }

    const db = await connectDB();
    const usersCollection = db.collection("Placement student");

    // Find user
    const user = await usersCollection.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        error: "Email already verified"
      });
    }

    // Check if code matches
    if (user.verificationCode !== code) {
      return res.status(400).json({
        success: false,
        error: "Invalid verification code"
      });
    }

    // Check if code expired
    if (new Date() > new Date(user.verificationCodeExpiry)) {
      return res.status(400).json({
        success: false,
        error: "Verification code expired. Please request a new one."
      });
    }

    // Verify user
    await usersCollection.updateOne(
      { email: email.toLowerCase() },
      { 
        $set: { 
          isVerified: true,
          updatedAt: new Date()
        },
        $unset: { 
          verificationCode: "",
          verificationCodeExpiry: ""
        }
      }
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "my-dog-is-cute",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Email verified successfully!",
      token,
      user: {
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({
      success: false,
      error: "Verification failed. Please try again."
    });
  }
});

// Resend Verification Code
router.post("/resend-verification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        error: "Email is required"
      });
    }

    const db = await connectDB();
    const usersCollection = db.collection("Placement student");

    const user = await usersCollection.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        error: "Email already verified"
      });
    }

    // Generate new code
    const verificationCode = generateVerificationCode();
    const codeExpiry = new Date(Date.now() + 10 * 60 * 1000);

    // Update user with new code
    await usersCollection.updateOne(
      { email: email.toLowerCase() },
      {
        $set: {
          verificationCode,
          verificationCodeExpiry: codeExpiry,
          updatedAt: new Date()
        }
      }
    );

    // Send email
    const emailResult = await sendVerificationEmail(email, verificationCode, user.name);

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        error: "Failed to send verification email"
      });
    }

    res.json({
      success: true,
      message: "Verification code sent! Please check your email."
    });

  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to resend code. Please try again."
    });
  }
});

// Login Route (Updated - check if verified)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        error: "Email and password are required" 
      });
    }

    const db = await connectDB();
    const usersCollection = db.collection("Placement student");

    const user = await usersCollection.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: "Invalid email or password" 
      });
    }

    // Check if email is verified
    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        error: "Please verify your email before logging in",
        needsVerification: true,
        email: user.email
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: "Invalid email or password" 
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "my-dog-is-cute",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Login failed. Please try again." 
    });
  }
});

// Verify Token Route
router.get("/verify", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: "No token provided" 
      });
    }

    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || "my-dog-is-cute"
    );

    const db = await connectDB();
    const usersCollection = db.collection("Placement student");
    const user = await usersCollection.findOne(
      { email: decoded.email },
      { projection: { password: 0, verificationCode: 0 } }
    );

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: "User not found" 
      });
    }

    res.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        isVerified: user.isVerified
      }
    });

  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ 
      success: false, 
      error: "Invalid or expired token" 
    });
  }
});

export default router;