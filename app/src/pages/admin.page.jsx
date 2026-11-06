import React from "react";
import { useNavigate } from "react-router-dom";

import "./admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    navigate("/admin/dashboard");
  };

  return (
    <>
      <div className="w-full h-dvh flex justify-center items-center gap-0.5">
        <div className="form-container flex w-1/2">
          <div className="form w-1/2">
            <form
              action=""
              className="flex flex-col justify-evenly gap-2.5 p-6 form-control h-96"
              onSubmit={handleLogin}
            >
              <h2 className="title text-3xl font-bold">
                Welcome to your panel!
              </h2>
              <p>Ingresa tus credenciales para entrar al panel.</p>

              <div className="input-container w-full">
                <div className="input-field relative">
                  <input required={true} type="text" className="email input" />
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                </div>

                <div className="input-field relative">
                  <input
                    required={true}
                    type="password"
                    className="password input"
                  />
                  <label htmlFor="email" className="label">
                    Password
                  </label>
                </div>
              </div>

              <button className="submit-btn p-2.5">Ingresar</button>
            </form>
          </div>

          <div className="icon w-1/2"></div>
        </div>
      </div>
    </>
  );
};

export default Admin;
