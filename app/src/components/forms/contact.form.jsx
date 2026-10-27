import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { Turnstile } from "@marsidev/react-turnstile"
import "./styles.form.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [turnstileToken, setTurnstileToken] = useState("")
  const turnstileRef = useRef(null)


  const API_URL = import.meta.env.VITE_API_URL

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(loading) return

    if(!turnstileToken) {
      setFeedback({
        type: "error",
        message: "Completa la verificación de seguridad."
      })
    }

    setLoading(true)
    setFeedback(null)

    try {
      console.log("Datos enviados:", formData)
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
        turnstileToken
        })
      })

      const data = await response.json()

      if(!response.ok) {
        setFeedback({
          type: "error",
          message: data.message || "No se pudo enviar la consulta."
        })

        return
      }

      setFeedback({
        type: data.email_status === "failed" ? "warning" : "success",
        message: data.message,
        consultationId: data.consultation_id
      })

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      })
    } catch(error) {
      console.log("Error enviando consulta: ", error)

      setFeedback({
        type: "error",
        message: "No se pudo conectar con el servidor. Intente nuevamente."
      })
    }
    finally {
      setLoading(false)
      setTurnstileToken("")
      turnstileRef.current?.reset()
    }
  }


  return (
    <div className="contact w-full px-60 py-10 flex flex-wrap mt-25">
      <div className="left-form w-1/2">

        <h2 className="text-3xl font-medium w-full">
          ¿Dudas? Contáctate con nosotros!
        </h2>

        <form 
          action="" 
          method="post"
          onSubmit={handleSubmit} 
          className="contact-form w-full p-5">

          <div className="inputs w-full">

            <div className="form-group relative mt-5">

              <input
                type="text"
                id="contact-name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                minLength={2}
                maxLength={100}
                required
                className="form-input h-10 w-full outline-none"
              />
              <label
                htmlFor="contact-name"
                className="lbl absolute left-4 top-2.5"
              >
                Nombre
              </label>
            </div>

            <div className="form-group relative mt-5">
              <input
                type="email"
                id="contact-email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                maxLength={254}
                required
                className="form-input h-10 w-full outline-none"
              />
              <label
                htmlFor="contact-email"
                className="lbl absolute left-4 top-2.5"
              >
                Correo
              </label>
            </div>

            <div className="form-group relative mt-5">
              <input
                type="text"
                id="contact-subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                minLength={3}
                maxLength={150}
                required
                className="form-input h-10 w-full outline-none"
              />
              <label
                htmlFor="subject"
                className="lbl absolute left-4 top-2.5"
              >
                Asunto
              </label>
            </div>

            <div className="form-group relative mt-5">
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                minLength={10}
                maxLength={2000}
                required
                className="text-area w-full outline-none"
                placeholder="Mensaje"
              ></textarea>
            </div>
          </div>

          <Turnstile 
            ref={turnstileRef}
            siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
            options={{
              theme: "auto",
              size: "normal"
            }}
            onSuccess={(token) => { setTurnstileToken(token) }}
            onExpire={() => { setTurnstileToken("") }}
            onError={() => { setTurnstileToken("") }}
            className="w-full"
          />

          <button
            type="submit"
            disabled={loading || !turnstileToken}
            className="form-btn w-full p-3 mt-3 rounded-[5px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando" : "Enviar"}
          </button>
          <span className="login-redirect">¿Ya tienes una cuenta? <Link to="/login" className="login-link transition">Inicia sesión</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Contact;
