import { sileo } from "sileo"

const ERROR_DURATION = 8000

const success = (title, description) => sileo.success({ title, description })
const info = (title, description) => sileo.info({ title, description })
const warning = (title, description) => sileo.warning({ title, description })
const error = (title, description) => sileo.error({ title, description, duration: ERROR_DURATION })

export const notify = {
    success,
    info,
    warning,
    error,


    // ----- login -----
    loginSuccess: () => success("Sesión iniciada correctamente"),
    loginError: (reason) => error("No se pudo iniciar sesión", reason),
    logoutSuccess: () => success("Has cerrado sesión exitosamente", "Nos vemos!"),
    logoutError: () => error("No se pudo cerrar la sesión", "Inténtalo nuevamente."),

    // ----- Registro -----
    signUnSuccess: () => success("Cuenta creada con éxito", "Ahora puedes iniciar sesión."),
    signUpError: (reason) => error("No se pudo crear la cuenta", reason),

    // ----- Reservas -----
    reservationError: (reason) => error("No se pudo crear la reserva", reason),
    reservationCancelled: () => info("Reserva cancelada"),
    reservationCancelError: (reason) => error("No se pudo cancelar la reserva", reason),

    // ----- Pagos -----
    paymentSuccess: (email) => success("Pago completado", email ? `Te enviamos un correo de confirmación a ${email}.` : undefined),
    paymentCancelled: () => warning("Pago cancelado", "No se realizó ningún cobro. Tu reserva sigue pendiente."),
    paymentReview: (reason) => info("Tu pago está en revisión", reason),
    paymentError: (reason) => error("No se pudo procesar el pago", reason),

    // ----- Contacto -----
    messageSent: (consultationId) => success("Tu mensaje se ha enviado", consultationId ? `N.º de consulta: ${consultationId}` : undefined),
    messageRecievedNoEmail: (reason) => warning("Recibimos tu mensaje", reason),
    messageError: (reason) => error("No se pudo enviar el mensaje", reason)
}   