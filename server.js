import dotenv from "dotenv"
dotenv.config()

import app from "./main.js"
import connectDB from "./config/database.js"

const PORT = process.env.PORT || 8080

const startServer = async() => {
    console.log("Iniciando Backend")
    await connectDB()

    app.listen(PORT, () => {
        console.log(`Servidor ejecutandose en ${PORT}`)
    })
}

startServer()