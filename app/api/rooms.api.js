const API_URL = import.meta.env.VITE_API_URL

export const getRooms = async () => {
    const response = await fetch(`${API_URL}/api/rooms`)

    if(!response.ok){
        throw new Error("Error getting rooms")
    }

    return response.json()
}

export const getRoomById = async (id) => {
    
    const response = await fetch(
        `${API_URL}/api/rooms/${id}`
    )

    if(!response.ok){
        throw new Error("Error getting room")
    }

    return response.json()
}