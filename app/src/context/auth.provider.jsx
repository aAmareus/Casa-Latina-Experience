import { useEffect, useState } from "react"
import { AuthContext } from "./auth.context.jsx"

const API_URL = import.meta.env.VITE_API_URL

export const AuthProvider = ({ children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // When open app: check if session is still valid and get user data

    useEffect(() => {
        const controller = new AbortController()

        const loadSession = async () => {
            try {
                const response = await fetch(`${API_URL}/api/users/profile`, {
                    credentials: "include",
                    signal: controller.signal
                })

                if(response.ok) {
                    const data = await response.json()
                    setUser(data.user)
                } else {
                    setUser(null)
                }
            } catch(error) {
                if(error.name === "AbortError") return

                console.error("Error verificando la sesión del usuario: ", error)
                setUser(null)
            } finally {
                if (!controller.signal.aborted) setLoading(false)
            }
        }

        loadSession()

        return () => controller.abort()
    }, [])

    const login = (userData) => {
        setUser({ ...userData, _id: userData._id ?? userData.id })
    }

    const logout = async () => {
        try {
            const response = await fetch(`${API_URL}/api/users/logout`, {
                method: "POST",
                credentials: "include"
            })

            if (!response.ok) throw new Error(`Error HTTP ${response.status}`)
            
            setUser(null)
            return true

        } catch (error) {
            console.error("Error al cerrar sesión: ", error)
            return false
        }
    }

    return(
        <AuthContext.Provider value={{ user, loading, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}