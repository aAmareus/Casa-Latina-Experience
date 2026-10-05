import { Router } from "express"

import { createRoom, getRooms, getRoomById, updateRoom, deleteRoom, uploadRoomImages, deleteRoomImage } from "../controllers/room.controller.js"

import { uploadRoomImages as uploadImages } from "../middlewares/upload.middleware.js"
import { validate } from "../middlewares/validate.middleware.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"
import { requireRole } from "../middlewares/role.middleware.js"

import { validateRoom, validateRoomUpdate } from "../validators/room.validator.js"

const router = Router();

router.get("/", getRooms)

router.get("/:id", getRoomById)

router.post(
    "/",
    authMiddleware,
    requireRole("admin"),
    validate(validateRoom),
    createRoom
)

router.post(
    "/:id/images",
    authMiddleware,
    requireRole("admin"),
    uploadImages.array("images", 10),
    uploadRoomImages
)

router.patch(
    "/:id",
    authMiddleware,
    requireRole("admin"),
    validate(validateRoomUpdate),
    updateRoom
)

router.delete(
    "/:id",
    authMiddleware,
    requireRole("admin"),
    deleteRoom
)

router.delete(
    "/:id/images/:filename",
    authMiddleware,
    requireRole("admin"),
    deleteRoomImage
)

export default router;