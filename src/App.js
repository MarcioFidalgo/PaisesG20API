import "./styles.css";
import Home from "./componentes/home";
import NotFound from "./componentes/notFound";
import Agenda from "./componentes/agenda";
import Form from "./componentes/form";
import React from "react";
import Detalhes from "./componentes/paises";
import "./css/header.css";
import "./css/header2.css";
import Sidebar from "./componentes/sidebar";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <div className="header1">Países do G20</div>
        <div className="header2">
          <Link to="/form">
            <button id="botao">Formulário</button>
          </Link>
          <Link to="/agenda">
            <button id="botao">Autoridades</button>
          </Link>
        </div>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pais/:id" element={<Detalhes />} />
          <Route path="/form" element={<Form />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
