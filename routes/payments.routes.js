import { Router } from "express"

import { validate } from "../middlewares/validate.middleware.js"
import { validatePayment } from "../validators/payments.validator.js"

const router = Router();

router.post(
    "/",
    validate(validatePayment),
    (req,res) => {
        res.json({
            message: "Crear pago."
        })
    }
)

router.get(
    "/:id",
    (req,res) => {
        res.json({
            message: "Obtener pago."
        })
    }
)

export default router;