import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context.jsx";
import "./navigation.css";

const Navbar = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const [logginOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (logginOut) return;

    setLoggingOut(true);

    const closed = await logout();

    setLoggingOut(false);

    if (closed) {
      navigate("/");
    } else {
      alert("Error al cerrar sesión. Intente nuevamente.");
    }
  };

  return (
    <div className="w-full sticky top-0 navbar py-5 px-10 h-15 flex items-center justify-between">
      <div className="brand">
        <Link to={"/"} className="font-semibold text-2xl">
          Casa Latina Experience
        </Link>
      </div>

      <div className="toLogin flex justify-center items-center gap-2">
        {!loading &&
          (user ? (
            <>
              <span classname="mr-2">
                Hola, <strong>{user.name}</strong>
              </span>

              {user.rol === "admin" && (
                <a href="#" className="toPanel-btn px-4 py-1.5 rounded-sm transition-all">Panel</a> // Add dashboard url once the admin panel is ready!
              )}

              <button
                type="button"
                onClick={handleLogout}
                disabled={logginOut}
                className="main-btn btn py-1.5 px-4 rounded relative cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {logginOut ? "Saliendo..." : "Cerrar sesión"}
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                className="second-btn btn py-1.5 px-4 rounded relative"
              >
                Ingresar
              </Link>

              <Link
                to={"/login"}
                className="main-btn btn py-1.5 px-4 rounded relative"
              >
                Registrarse
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
