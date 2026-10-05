import validator from "validator";
import mongoose from "mongoose";

export const validateReserva = (reserva) => {

    const errors = {};


    // Room 
    if (!reserva.room_id) {
        errors.room_id = 'Room ID is requerido.';
    } else if (!mongoose.Types.ObjectId.isValid(reserva.room_id)) {
        errors.room_id = 'El ID es inválido.'
    }


    // Check-in
    if (!reserva.check_in) {
        errors.check_in = 'La fecha de check-in es requerida.';
    } else if (!validator.isISO8601(reserva.check_in)) {
        errors.check_in = 'La fecha de check-in no es válida.';
    }

    // Check-out
    if (!reserva.check_out) {
        errors.check_out = 'La fecha de check-out es requerida.';
    } else if (!validator.isISO8601(reserva.check_out)) {
        errors.check_out = 'La fecha de check-out no es válida.';
    }

    // Compara fechas
    if (
        reserva.check_in &&
        reserva.check_out &&
        validator.isISO8601(reserva.check_in) &&
        validator.isISO8601(reserva.check_out)
    ) {
        const checkIn = new Date(reserva.check_in);
        const checkOut = new Date(reserva.check_out);

        if (checkOut <= checkIn) {
            errors.check_out = 'La fecha de check-out debe ser posterior a la fecha de check-in.';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}