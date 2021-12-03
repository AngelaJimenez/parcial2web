import React from "react";
import Lugar from "./lugar";
import Cuarto from "./cuarto";


function Pagina() {
    return (
        <div className="container">
            <h1>My spaces</h1>
            <Lugar />

            <hr></hr>
            <h1>My rooms</h1>
            <Cuarto />

            <hr></hr>
        </div>
    );
}


export default Pagina;