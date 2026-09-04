import validator from "validator";

export const validateUser = (user) => {
    const errors= {};

    if (!user.name || !validator.isEmpty(user.name.trim())) {
        errors.name = 'El nombre es obligatorio.';
    } else if (!validator.isLength(user.name.trim(), { min: 2 })) {
        errors.name = 'El nombre debe contener al menos 2 carácteres.'
    }



    if (!user.lastname || !validator.isEmpty(user.lastname.trim())) {
        errors.lastname = 'El apellido es obligatorio.';
    } else if (!validator.isLength(user.lastname.trim(), { min: 2 })) {
        errors.lastname = 'El apellido debe contener al menos 2 carácteres.'
    }


    if (!user.email || !validator.isEmpty(user.email.trim())) {
        errors.email = 'El correo electrónico es obligatorio.';
    } else if (!validator.isEmail(user.email.trim())) {
        errors.email = 'El correo electrónico no es válido.';
    }


    if (!user.password || !validator.isEmpty(user.password.trim())) {
        errors.password = 'Por favor ingrese una contraseña.';
    } else if (!validator.isLength(user.password, { min: 8 })) {
        errors.password = 'La contraseña debe contener al menos 8 carácteres.'
    }


    if (!user.phone || !validator.isEmpty(user.phone.trim())) {
        errors.phone = 'El número de teléfono es obligatorio.';
    } else if (!validator.isMobilePhone(user.phone, 'any')) {
        errors.phone = 'El número de teléfono no es válido.';
    }


    return {
        isValid: Object.keys(errorrs).lenght === 0,
        errors
    }
}