import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/agenda1.css";
import notfound1 from "../componentes/notfound.jpg"

export default function NotFound() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            left: "43%",
            marginTop: "60px",
          }}
        >

<img src={notfound1} alt="Imagem de página não encontrada" id="img"/>

        </div>
      </div>
    );
  }
  