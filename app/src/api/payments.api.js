const API_URL = import.meta.env.VITE_API_URL

const request = async (path, options = {}) => {
    const response = await fetch(`${API_URL}${path}`, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        ...options
    })

    const data = await response.json().catch(() => ({}))

    if(!response.ok) {
        const error = new Error(data.message || "Error al procesar el pago")
        error.statis = response.status
        error.code = data.code
        throw error
    }

    return data
}

export const getCheckout = (reservationId) =>
    request(`/api/payments/checkout/${reservationId}`)

export const createPaypalOrder = (reservationId) =>
    request("/api/payments/paypal/orders", {
        method: "POST",
        body: JSON.stringify({ reservation_id: reservationId })
    })


export const capturePaypalOrder = (orderId) => {
    request(`/api/payments/paypal/orders/${orderId}/capture`, {
        method: "POST"
    })
}