const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.set('trust proxy', 1)

const allowedOrigin = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, "")

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))  // ✅ add this
app.use(cookieParser())

const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")

app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)

module.exports = app