import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongoose-connection.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: "https://chat-app-emss.onrender.com",
  credentials: true,
};

const __dirname = path.resolve();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

//Another Method for handle cors using custom middleware

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, PUT, POST, DELETE, UPDATE, OPTIONS "
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X_Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization"
//   );
//   next();
// });

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);
app.use("/api/v1/users", userRoutes);

app.use(express.static(path.join(__dirname, "Frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectDB();
  console.log(`server is running on PORT ${PORT}`);
});
