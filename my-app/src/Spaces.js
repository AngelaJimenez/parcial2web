import React, { useState, useEffect } from "react";

function Spaces(props){
    const url =   "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";

    let [lugar] = useState(props.lugar)
    
    const [cuarto, setCuarto] = useState([]);
    const [devices, setDevices] = useState([]);
  

    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.forEach(element => {
                let lugaresact = JSON.parse(JSON.stringify(element));
                console.log(lugar.id+" "+element.homeId)
                if (lugar.id == element.homeId) {
                    setCuarto(cuartico => {
                        return cuartico.concat(lugaresact)
                      });
                      let devicescuarto = JSON.parse(JSON.stringify(element.devices));
                      setDevices(device => {
                        return device.concat(devicescuarto)
                      });
                }
                    
            });
        });
    }, []);
  

    function quitarElementos() {
        var node = document.getElementById("rooms");
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
      }
  
  
    const aparecer =()=> {
        console.log(lugar);
        console.log(cuarto);
        console.log(devices);
        quitarElementos();
        let rooms = document.getElementById("rooms");
        let nom = document.createElement("h1");
        nom.innerText = "My rooms";
        nom.className = "text-center";
        rooms.appendChild(nom);

    }
    
    return(
        <div className = "col">
            <div className = "card">
                <div className="card-body" onClick={() => aparecer()}>
                <img className="card-img-top" src={lugar.type==="house"?"https://cdn.iconscout.com/icon/free/png-256/house-home-building-infrastructure-real-estate-resident-emoj-symbol-1-30743.png":"https://cdn0.iconfinder.com/data/icons/real-estate-blue-line/64/130-RealEstate-Blue_real-estate-building-apartment-house-512.png"} alt="Internet"/>
                    <h4 className = "card-title">
                        {lugar.name}
                    </h4>
                    <p>{lugar.address}</p>
                </div>
            </div>

        </div>
    )
}

export default Spaces