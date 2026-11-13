const API_URL = import.meta.env.VITE_API_URL

const parseResponse = async (response, fallbackMessage) => {
    const data = await response.json().catch(() => ({}))

    if(!response.ok) {
        const error = new Error(data.message || fallbackMessage)
        error.status = response.status
        throw error
    }

    return data
}

export const quoteReserva = async (
    roomId,
    checkIn,
    checkOut
) => {
    const response = await fetch(`${API_URL}/api/reservas/quote`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            room_id: roomId,
            check_in: checkIn,
            check_out: checkOut
        })
    })

    return parseResponse(response, "Error quoting reservation")
}


export const createReserva = async (
    roomId,
    checkIn,
    checkOut
) => {
    const response = await fetch(`${API_URL}/api/reservas`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            room_id: roomId,
            check_in: checkIn,
            check_out: checkOut
        })
    })

    return parseResponse(response, "No se pudo crear la reserva")
}

export const cancelReserva = async (reservaId) => {
    const response = await fetch(`${API_URL}/api/reservas/${reservaId}/cancel`, {
        method: "PATCH",
        credentials: "include"
    })

    return parseResponse(response, "No se pudo cancelar la reserva")
}