import validator from "validator";

const allowedAmenities = [
    "wifi",
    "pool",
    "parking",
    "air_conditioning",
    "rest_areas",
    "personalized_attention",
    "towels",
    "continental_breakfast",
    "bbq_grill"
]

const validateAmenities = (amenities) => {
    if(!Array.isArray(amenities)){
        return "Amenities must be an array."
    }

    const invalidAmenities = amenities.filter(
        amenity => typeof amenity !== "string" || !allowedAmenities.includes(amenity)
    )

    if(invalidAmenities.length > 0){
        return `Invalid amenities: ${invalidAmenities.join(", ")}`
    }
}

export const validateRoom = (room) => {

    const errors = {};
    
    // Nombre de la habitación
    if (!room.name || validator.isEmpty(room.name.trim())) {
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

    if(room.amenities !== undefined){
       
        const amenitiesError = validateAmenities(room.amenities)

        if(amenitiesError){
            errors.amenities = amenitiesError
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    }
}

export const validateRoomUpdate = (room) => {
    const errors = {};

    if (room.name !== undefined) {
        if (
            typeof room.name !== "string" ||
            room.name.trim().length < 2
        ) {
            errors.name =
                "The name must contain at least 2 characters";
        }
    }

    if (
        room.description !== undefined &&
        typeof room.description !== "string"
    ) {
        errors.description =
            "The description must be a string";
    }

    if (room.capacity !== undefined) {
        if (
            !Number.isInteger(room.capacity) ||
            room.capacity < 1
        ) {
            errors.capacity =
                "Capacity must be an integer greater than or equal to 1";
        }
    }

    const prices = [
        "priceHighSeason",
        "priceLowSeason",
        "priceMidSeason",
        "priceCarnivalSeason"
    ];

    prices.forEach((price) => {
        if (room[price] !== undefined) {
            if (
                typeof room[price] !== "number" ||
                room[price] < 0
            ) {
                errors[price] =
                    "Price must be a number greater than or equal to 0";
            }
        }
    });

    if (room.descuento !== undefined) {
        if (
            typeof room.descuento !== "number" ||
            room.descuento < 0 ||
            room.descuento > 100
        ) {
            errors.descuento =
                "Discount must be between 0 and 100";
        }
    }

    if(room.amenities !== undefined){
       
        const amenitiesError = validateAmenities(room.amenities)

        if(amenitiesError){
            errors.amenities = amenitiesError
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};