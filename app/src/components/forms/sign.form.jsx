import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

import Logotipo_ppl from "../../assets/icons/Logotipo-Nosotros.webp";
import Logotipo from "../../assets/icons/Logotipo.webp";

import "./styles.form.css"

const formBase =
  "col-start-1 row-start-1 flex flex-col items-center justify-center overflow-hidden " +
  " px-20 transition-all duration-200 delay-700 max-[570px]:px-6"

const inputField =
  "relative my-2.5 grid h-[55px] w-full max-w-[380px] grid-cols-[15%_85%] " +
  "rounded-[55px] px-[0.4rem]";

const inputIcon =
  "self-center justify-self-center text-[1.1rem] transition-all duration-500 **:text-inherit"

const inputBase =
  "bg-transparent border-none outline-none leading-none text-[1.1rem] font-semibold " +
  "placeholder:font-medium";

const btnBase =
  "rounded-[49px] uppercase font-semibold cursor-pointer outline-none " +
  "transition-all duration-500"

const btnSolid =
  `${btnBase} m-0 h-[41px] w-[130px] border-2 border-white bg-transparent text-[0.8rem] ` +
  "max-[870px]:h-[35px] max-[870px]:w-[110px] max-[870px]:text-[0.7rem]"

const btnTransparent =
  `${btnBase} m-o h-[41px] w-[130px] border-2 bg-transparent text-[0.8rem] ` +
  "max-[870px]:h-[35px] max-[870px]:w-[110px] max-[870px]:text-[0.7rem]";

const panelBase =
  "z-6 flex flex-col items-end justify-around text-center " +
  "max-[870px]:col-start-1 max-[870px]:flex-row max-[870px]:items-center max-[870px]:justify-around " +
  "max-[870px]:pt-10 max-[870px]:pb-10 max-[870px]:pl-[8%] max-[870px]:pr-[8%]"

const panelContent =
  "transition-transform duration-900 delay-600 ease-in-out " +
  "max-[870px]:pr-[15%] max-[870px]:delay-800 max-[570px]:px-4 max-[570px]:py-2"

const panelImage =
  "w-full max-w-80 object-contain transition-transform duration-[1100ms] delay-400 ease-in-out " +
  "max-[870px]:w-50 max-[870px]:duration-900 max-[870px]:delay-600 max-[570px]:hidden"

const panelTitle =
  "text-2xl leading-none font-semibold max-[870px]:text-[1.2rem]"

const panelText =
  "py-[0.7rem] text-[0.95rem] text-white max-[870px]:py-2 max-[870px]:text-[0.7rem]"

// FUNCTION
const SignForm = () => {

  const API_URL = import.meta.env.VITE_API_URL

  const [isSignUp, setIsSignUp] = useState(false);

  // vars to handle forms
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [pwd, setPwd] = useState("");

  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSignIn = async (e) => {
    e.preventDefault();

    if(submitting) return

    setSubmitting(true)
    setError(null)

    try {
        const response = await fetch(`${API_URL}/api/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.trim().toLowerCase(),
                password: pwd
            })
        })

        const data = await response.json()

        if(!response.ok) {
            setError(
              data.errors
                ? Object.values(data.errors).join(" ")
                : data.message || "No se pudo registrar el usuario.",
            )

            return
        }

        alert("Inicio de sesión exitoso!");
        setEmail("");
        setPwd("");

        setIsSignUp(false);
    } catch(error) {
        console.error("Error al iniciar sesión:", error)
        setError("No se pudo conectar al servidor.")
    } finally {
        setSubmitting(false)
    }
    //TO DO backend connection
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if(submitting) return

    setSubmitting(true)
    setError(null)
    
    try {
        const response = await fetch(`${API_URL}/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.trim(),
                lastname: lastName.trim(),
                email: email.trim().toLowerCase(),
                password: pwd,
                phone: phone.trim()
            })
        })

        const data = await response.json()

        if(!response.ok) {
            setError(
                data.errors
                    ? Object.values(data.errors).join(" ")
                    : data.message || "No se pudo registrar el usuario."
            )

            return
        }

        alert("Usuario registrado exitosamente!")
        setName("") 
        setLastName("")
        setPhone("")
        setEmail("")
        setPwd("")

        setIsSignUp(false)
    } catch(error) {
        console.error("Error en la petición: ", error)
        setError("No se pudo conectar con el servidor.")
    } finally {
        setSubmitting(false)
    }
  }

  // ---------- Clases que depoenden del estado ----------
  const circleBase =
    "before:absolute before:content-[''] before:z-6 before:h-[2000px] before:w-[2000px] " +
    "before:top-[-10%] before:-translate-y-1/2 before:rounded-full " +
    "before:bg-[linear-gradient(-45deg,#00225b_0%,#006526_100%)] " +
    "before:transition-all before:duration-[1800ms] before:ease-in-out " +
    // responsivo
    "max-[870px]:before:h-[1500px] max-[870px]:before:w-[1500px] max-[870px]:before:top-auto " +
    "max-[870px]:before:right-auto max-[870px]:before:left-[30%] max-[870px]:before:-translate-x-1/2 " +
    "max-[870px]:before:duration-2000 max-[570px]:before:left-1/2";


  const circleState = isSignUp
    ? "before:right-[52%] before:translate-x-full " +
      "max-[870px]:before:translate-y-full max-[870px]:before:bottom-[32%] max-[570px]:before:bottom-[28%]"
    : "before:right-[48%] " +
      "max-[870px]:before:translate-y-0 max-[870px]:before:bottom-[68%] max-[570px]:before:bottom-[72%]"

  // ----- Contenedores -----
  const formsWrapperBase =
    "absolute top-1/2 z-5 grid w-1/2 -translate-x-1/2 -translate-y-1/2 grid-cols-1 " +
    "transition-all duration-1000 delay-700 ease-in-out " +
    "max-[870px]:left-1/2 max-[870px]:w-full max-[870px]:delay-800"

  const formsWrapperState = isSignUp
    ? "left-1/4 max-[870px]:top-[5%] max-[870px]:translate-y-0"
    : "left-3/4 max-[870px]:top-[95%] max-[870px]:-translate-y-full"

  const leftShift = isSignUp
    ? "-translate-x-[800px] max-[870px]:translate-x-0 max-[870px]:-translate-y-[300px]"
    : "";

  const rightShift = isSignUp
    ? "translate-x-0 max-[870px]:translate-y-0"
    : "translate-x-[800px] max-[870px]:translate-x-0 max-[870px]:translate-y-[300px]"

  return (
    <div
      className={
        "relative min-h-160 w-full overflow-hidden " +
        "max-[870px]:h-screen max-[870px]:min-h-200 max-[570px]:p-6 " +
        `${circleBase} ${circleState}`
      }
    >
      <div className="absolute top-0 left-0 h-full w-full">
        <div className={`${formsWrapperBase} ${formsWrapperState}`}>
          {/* Sign in form */}

          <form
            className={`${formBase} ${isSignUp ? "z-1 opacity-0" : "z-2"} sign-in-form`}
            onSubmit={handleSignIn}
            inert={isSignUp}
          >
            <h2 className="mb-2.5 text-[2.2rem] font-semibold">
              Bienvenido de vuelta!
            </h2>

            <div className={inputField}>
              <FontAwesomeIcon icon={faUser} className={inputIcon} />
              <input
                type="email"
                name="useremail"
                placeholder="Correo"
                aria-label="Correo"
                required
                className={inputBase}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={inputField}>
              <FontAwesomeIcon icon={faLock} className={inputIcon} />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                aria-label="Contraseña"
                autoComplete="current-password"
                required
                className={inputBase}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>

            <button type="submit" className={`${btnSolid} form-btn`}>
              Ingresar
            </button>
          </form>

          {/* Sign up form */}
          <form
            className={`${formBase} ${isSignUp ? "z-2 opacity-100" : "z-1 opacity-0"}`}
            onSubmit={handleSignUp}
            inert={!isSignUp}
          >
            <h2 className="mb-2.5 text-[2.2rem] font-semibold">Registrate</h2>

            <div className={inputField}>
              <FontAwesomeIcon icon={faUser} className={inputIcon} />
              <input
                type="text"
                name="userName"
                placeholder="Nombre"
                aria-label="Nombre"
                autoComplete="given-name"
                required
                className={inputBase}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={inputField}>
              <FontAwesomeIcon icon={faUser} className={inputIcon} />
              <input
                type="text"
                name="userLName"
                placeholder="Apellido"
                aria-label="Apellido"
                autoComplete="family-name"
                required
                className={inputBase}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className={inputField}>
              <FontAwesomeIcon icon={faPhone} className={inputIcon} />
              <input
                type="tel"
                name="userPhone"
                placeholder="Núm tel. (+1...)"
                aria-label="user-phone"
                autoComplete="tel"
                required
                className={inputBase}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className={inputField}>
              <FontAwesomeIcon icon={faEnvelope} className={inputIcon} />
              <input
                type="email"
                name="userEmail"
                placeholder="Correo"
                aria-label="Correo"
                autoComplete="email"
                required
                className={inputBase}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={inputField}>
              <FontAwesomeIcon icon={faLock} className={inputIcon} />
              <input
                type="password"
                name="userPass"
                placeholder="Contraseña"
                aria-label="Contraseña"
                autoComplete="new-password"
                required
                className={inputBase}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}
            <button type="submit" className={`${btnSolid} form-btn`}>
              Registrarse
            </button>
          </form>
        </div>
      </div>

      <div className="absolute top-0 left-0 grid h-full w-full grid-cols-2 max-[870px]:grid-cols-1 max-[870px]:grid-rows-[1fr_2fr_1fr]">
        {/* left panel */}
        <div
          className={
            `${panelBase} pt-12 pr-[17%] pb-8 pl-[12%] max-[870px]:row-start-1 ` +
            (isSignUp ? "pointer-events-none" : "pointer-events-auto")
          }
        >
          <div className={`${panelContent} ${leftShift}`}>
            <h3 className={`${panelTitle} panel-title`}>¿No tienes cuenta?</h3>

            <p className={panelText}>
              No te preocupes, aquí puedes crear una cuenta para obtener el
              mejor hospedaje de la Regiao Do Lagos{" "}
            </p>
            <button
              type="button"
              className={`${btnTransparent} panel-btn`}
              onClick={() => setIsSignUp(true)}
            >
              regístrame
            </button>
          </div>
          <img
            src={Logotipo_ppl}
            className={`${panelImage} ${leftShift}`}
            alt="Casa Latina experience - Logo con nosotros"
          />
        </div>

        {/* Right Panel */}
        <div
          className={
            `${panelBase} pt-12 pr-[12%] pb-8 pl-[17%] max-[870px]:row-start-3 ` +
            (isSignUp ? "pointer-events-auto" : "pointer-events-none")
          }
        >
          <div className={`${panelContent} ${rightShift}`}>
            <h3 className={`${panelTitle} panel-title`}>
              ¿Ya eres uno de nosotros?
            </h3>
            <p className={panelText}>
              Ingresa con tus credenciales para volver a vivir esos momentos
              mágicos que te ofrece Casa Latina Experience!
            </p>

            <button
              type="button"
              className={`${btnTransparent} panel-btn`}
              onClick={() => setIsSignUp(false)}
            >
              Iniciar sesión
            </button>
          </div>

          <img
            src={Logotipo}
            className={`${panelImage} ${rightShift}`}
            alt="Casa Latina Experience - Logo"
          />
        </div>
      </div>
    </div>
  );
};

export default SignForm;
