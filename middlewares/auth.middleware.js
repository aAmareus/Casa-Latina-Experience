import jwt from "jsonwebtoken"
import User from "../models/user.js" // change to User inf error

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success: false,
                message: "Auth Token required"
            })
        }

        const token = authHeader.substring(7).trim()

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Auth token required"
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        if(user.active === false){
            return res.status(403).json({
                success: false,
                message: "Account was disabled"
            })
        }

        req.user = user

        next()
    } catch(e){
        console.error("Auth error", e)

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}