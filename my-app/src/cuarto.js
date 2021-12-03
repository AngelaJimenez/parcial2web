import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Room from './Room'


function Cuarto() {


    let url = "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

    const [cuarto, setCuarto] = useState([]);
  
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCuarto(data);
        });
    }, []);
  


    
    return (
        <div className="container">
        <div className="row">
          {cuarto.map((p) => (
            <Room cuarto={p} key={p.id} />
          ))}
        </div>
      </div>
    );
  
}


export default Cuarto;