import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadPath = path.join(
    __dirname,
    "../uploads/rooms"
)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() *1E9)}`

        cb(
            null,
            uniqueName + path.extname(file.originalname)
        )
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]

    if(!allowedTypes.includes(file.mimetype)){
        return cb(
            new Error("Only JPG, PNG, and WEBP images are allowed")
        )
    }

    cb(null, true)
}

export const uploadRoomImages = multer({
    storage,
    fileFilter,
    limits: {
        filesize: 5 * 1024 * 1024
    }
})