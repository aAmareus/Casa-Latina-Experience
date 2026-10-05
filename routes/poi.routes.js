import express from "express"

import { authMiddleware } from "../middlewares/auth.middleware.js"
import { requireRole } from "../middlewares/role.middleware.js"

import {
    getPois,
    getPoidById,
    createPointOfInterest,
    updatePointOfInterest,
    deletePointOfInterest
} from "../controllers/poi.controller.js"


const router = express.Router()

router.get("/", getPois)

router.get("/:id", getPoidById)

router.post(
    "/",
    authMiddleware,
    requireRole("admin"),
    createPointOfInterest
)

router.patch(
    "/:id",
    authMiddleware,
    requireRole("admin"),
    updatePointOfInterest
)

router.delete(
    "/:id",
    authMiddleware,
    requireRole("admin"),
    deletePointOfInterest
)

export default router