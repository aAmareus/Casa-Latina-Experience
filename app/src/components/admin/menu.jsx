import React from "react";

import "../pages/admin.css";

const Menu = () => {
  return (
    <>
      <div className="menuhandler ml-32 mt-32 p-5 flex flex-col justify-between">
        {/* search bar */}
        <div className="searchbar w-full">
          <ul className="searchlist flex items-center gap-4 w-full">
            <li>
              <input
                type="text"
                placeholder="Buscar... (Usuario, habitación, reserva, etc)"
                className="searchinput"
              />
            </li>
            <li className="search-item user-cat">Usuario</li>
            <li className="search-item room-cat">Habitaciones</li>
            <li className="search-item res-cat">Reservas</li>
            <li className="search-item pay-cat">Pagos</li>
          </ul>
        </div>

        {/* database content */}
        <div className="db-content w-full p-5 flex flex-col gap-3">

          {/* This will be replaced by a map function that displays the current users rooms, bookins, and payments */}
          <div className="card-container flex flex-col gap-2">
          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>

          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>

          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>

          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>

          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>

          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>

          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>

          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>

          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>

          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>

          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>

          <div className="usercard w-full flex justify-between h-12 p-1">
            <div className="left flex gap-3 items-center">
              <div className="user-pfp"></div>
              <h2 className="user-name">Nombre Usuario</h2>
            </div>
            <div className="middle flex gap-3 items-center">
              <div className="user-id">123hnjA8hBVdmm2Hhd</div>
              <div className="country">Chile</div>
              <div className="number">+56946311360</div>
            </div>
            <div className="right">
              <button className="openModal user-button">Ver</button>
            </div>
          </div>
          </div>
          div.
        </div>
        {/* counter or pagination */}
        <div className="counter w-full">
          Mostrando: 999 Usuarios | 45 Inactivos | 954 Activos
        </div>
      </div>
    </>
  );
};

export default Menu;
