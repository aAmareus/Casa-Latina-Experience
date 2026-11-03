// Import this shit whenever render an image form the db
const API_URL = import.meta.env.VITE_API_URL;

export const imgUrl = (path) =>{ 

    if (typeof path !== "string" || !path) return null
    return path.startsWith("http") ? path : `${API_URL}${path}`;
}