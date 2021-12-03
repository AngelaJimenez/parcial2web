import React, { useState, useEffect } from "react";
import Space from './Spaces'

import 'bootstrap/dist/css/bootstrap.min.css';


function Lugar() {
    let url = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";

    const [lugar, setLugar] = useState([]);
  
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
         setLugar(data);
        });
    }, []);
  


    
    return (
        <div className="container">
        <div className="row">
          {lugar.map((p) => (
            <Space lugar={p} key={p.id} />
          ))}
        </div>
      </div>
    );
  
}


export default Lugar;