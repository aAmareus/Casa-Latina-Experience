import validator from "validator";
import mongoose from "mongoose";

export const validatePayment = (pay) => {

    const errors = {};

    // Reserva
    if (!pay.reservation_id) {
        errors.reservation_id = 'El ID de la reserva es requerido.';
    } else if (!mongoose.isValidObjectId(pay.reservation_id)) {
        errors.reservation_id = 'El ID de la reserva no es válido.';
    }

    // Proveedor
    if (!pay.provider || validator.isEmpty(pay.provider.trim())) {
        errors.provider = 'El proveedor de pago es requerido.';
    }

    // Moneda
    if (!pay.currency || validator.isEmpty(pay.currency.trim())) {
        errors.currency = 'La moneda es obligatoria.';
    } else if (
        !validator.isLength(pay.currency.trim(), {min: 3, max: 3})
    ) {
        errors.currency = 'La moneda debe tener 3 carácteres.';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}