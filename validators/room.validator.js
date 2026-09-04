import validator from "validator";

export const validateRoom = (room) => {

    errors = {};
    
    // Nombre de la habitación
    if (!room.name || !validator.isEmpty(room.name.trim())) {
        errors.name = 'El nombre de la habitación es obligatorio.';
    } else if (!validator.isLength(room.name.trim(), { min: 2 })) {
        errors.name = 'El nombre de la habitación debe contener al menos 2 carácteres.'
    }

    // Descripción de la habitación
    if (room.description !== undefined && typeof room.description !== 'string') {
        errors.description = 'La descripción debe ser un texto.'
    }


    // Capacidad
    if (room.capacity === undefined || room.capacity === null) {
        errors.capacity = 'La capacidad es obligatoria.';
    } else if (!Number.isInteger(room.capacity) || room.capacity < 1) {
        errors.capacity = 'La capacidad debe ser un numero entero mayor a 0.';
    }


    // Precios por temporada
    const prices = [
        'priceHighSeason',
        'priceLowSeason',
        'priceMidSeason',
        'priceCarnivalSeason'
    ];

    prices.forEach((price) => {
        if (room[price] === undefined || room[price] === null) {
            errors[price] = 'El precio es obligatorio.';
        } else if (typeof room[price] !== 'number' || room[price] < 0) {
            errors[price] = 'El precio debe ser un número mayor o igual a 0.';
        }
    })

    // Descuento
    if (room.descuento !== undefined) {
        if (typeof room.descuento !== 'number' || room.descuento < 0 || room.descuento > 100) {
            errors.descuento = 'El descuento debe estar entre 0 y 100.';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}