const API_URL = import.meta.env.VITE_API_URL

export const quoteReserva = async (
    roomId,
    checkIn,
    checkOut
) => {
    const response = await fetch(`${API_URL}/api/reservas/quote`,{
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

    const data = await response.json()

    if(!response.ok){
        throw new Error(
            data.message || "Error quoting reservation"
        )
    }

    return data
}