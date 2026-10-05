import { Router } from "express"

import { createReserva, getReservas, getReservaById, cancelReserva } from "../controllers/reserva.controller.js";

import { validate } from "../middlewares/validate.middleware.js"
import { validateReserva } from "../validators/reserva.validator.js"
import { authMiddleware } from "../middlewares/auth.middleware.js"

const router = Router();

router.get(
    "/",
    authMiddleware,
    getReservas
)

router.get(
    "/:id",
    authMiddleware,
    getReservaById
)

router.post(
    "/",
    authMiddleware,
    validate(validateReserva),
    createReserva
)

router.patch(
    "/:id/cancel",
    authMiddleware,
    cancelReserva
)
export default router