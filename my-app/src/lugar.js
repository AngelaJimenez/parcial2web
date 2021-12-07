import React, { useState, useEffect, useRef } from "react";

import { FormattedMessage } from "react-intl";
import * as d3 from "d3";
import "bootstrap/dist/css/bootstrap.min.css";
let idLocal = 1;
let idLocalCuarto = "";

function Lugar() {
  let url =
    "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
  let urlRoom =
    "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
  const [lugar, setLugar] = useState([]);
  const [cuarto, setCuarto] = useState([]);
  const [cuartoreal, setCuartoreal] = useState([]);

  const [devices, setDevices] = useState([]);

  const [cuartosPie, setCuartosPie] = useState([]);

  useEffect(() => {
    if (navigator.onLine) {
      if (localStorage.getItem("cuarto") == null) {
        fetch(urlRoom)
          .then((response) => response.json())
          .then((data) => {
            setCuartoreal(data);
            localStorage.setItem("cuarto", JSON.stringify(data));
          });
      } else {
        setCuartoreal(JSON.parse(localStorage.getItem("cuarto")));
      }

      if (localStorage.getItem("lugares") == null) {
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            setLugar(data);
            localStorage.setItem("lugares", JSON.stringify(data));
          });
      } else {
        setLugar(JSON.parse(localStorage.getItem("lugares")));
      }
    } else {
      setCuartoreal(JSON.parse(localStorage.getItem("cuarto")));
      setLugar(JSON.parse(localStorage.getItem("lugares")));
    }
  }, []);

  const pieChart = useRef();

  useEffect(() => {
    const piedata = d3.pie().value((d) => d.powerUsage.value)(cuartosPie);
    const arc = d3.arc().innerRadius(0).outerRadius(200);
    const colors = d3.scaleOrdinal([
      "#8B97FD",
      "#FFCCF5",
      "#E877FF",
    ]);
    const svg = d3
      .select(pieChart.current)
      .attr("width", 600)
      .attr("height", 600)
      .append("g")
      .attr("transform", "translate(300,300)");

    const tooldiv = d3
      .select("#ChartArea")
      .append("div")
      .style("visibility", "hidden")
      .style("position", "absolute");

    svg
      .append("g")
      .selectAll("path")
      .data(piedata)
      .join("path")
      .attr("d", arc)
      .attr("fill", (d, i) => colors(i))
      .attr("stroke", "white")
      .on("mouseover", (e, d) => {

        tooldiv
          .style("visibility", "visible")
          .text(`${d.data.name}: ${d.value}`+" "+`${d.data.powerUsage.unit}`);
      })
      .on("mousemove", (e, d) => {
        tooldiv
          .style("top", e.pageY - 50 + "px")
          .style("left", e.pageX - 50 + "px");
      })
      .on("mouseout", () => {
        tooldiv.style("visibility", "hidden");
      });
    });

  const aparecer = () => {
    let contador = 0;
    let alo = 0;
    let cuartos = [];
    let mydevices = [];

    cuartoreal.forEach((element) => {
      let idcasa = idLocal;
      if (idcasa.toString() === element.homeId.toString() && contador === 0) {
        cuartos.push(element);
        setDevices(element.devices);
        contador = contador + 1;
        element.devices.forEach((elementdev) => {
          elementdev.alo = alo;
          alo = alo + 1;
          mydevices.push(elementdev);
        });
      } else if (
        idLocal.toString() === element.homeId.toString() &&
        contador > 0
      ) {
        cuartos.push(element);
        element.devices.forEach((elementdev) => {
          elementdev.alo = alo;
          let devicejson = JSON.parse(JSON.stringify(elementdev));
          mydevices.push(elementdev);

          setDevices((device) => {
            return device.concat(devicejson);
          });
          alo = alo + 1;
        });
      }
    });
    setCuarto(cuartos);
    setCuartosPie(cuartos);
  };

  const aparecerDevices = () => {
    let contador = 0;
    let cuartos = [];

    let mydevices = [];
    let idcuarto = idLocalCuarto;
    let idcasa = idLocal;
    cuartoreal.forEach((element) => {
      if (element.name.toString() === idcuarto.toString()) {
        if (idcasa.toString() === element.homeId.toString() && contador === 0) {
          cuartos.push(element);
          setDevices(element.devices);
          contador = contador + 1;
          element.devices.forEach((elementdev) => {
            mydevices.push(elementdev);
          });
        } else if (
          idLocal.toString() === element.homeId.toString() &&
          contador > 0
        ) {
          cuartos.push(element);
          element.devices.forEach((elementdev) => {
            let devicejson = JSON.parse(JSON.stringify(elementdev));
            mydevices.push(elementdev);
            setDevices((device) => {
              return device.concat(devicejson);
            });
          });
        }
      }
    });
    setDevices(mydevices);
  };

  return (
    <div className="container">
      <div className="row">
        {lugar.map((p, i) => (
          <div className="col" key={i}>
            <div className="card">
              <div
                className="card-body"
                onClick={() => {
                  idLocal = p.id;
                  aparecer();
                }}
              >
                <img
                  className="card-img-top"
                  src={
                    p.type === "house"
                      ? "https://cdn.iconscout.com/icon/free/png-256/house-home-building-infrastructure-real-estate-resident-emoj-symbol-1-30743.png"
                      : "https://cdn0.iconfinder.com/data/icons/real-estate-blue-line/64/130-RealEstate-Blue_real-estate-building-apartment-house-512.png"
                  }
                  alt="Internet"
                />
                <h4 className="card-title">{p.name}</h4>
                <p>{p.address}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <hr></hr>
      <h1>
        <FormattedMessage id="MyRooms" />
      </h1>

      <div className="row">
        <div className="col">
          <div className="row">
            {cuarto.map((c, i) => (
              <div className="col" key={i}>
                <div className="card">
                  <div
                    className="card-body"
                    onClick={() => {
                      idLocalCuarto = c.name;
                      aparecerDevices();
                    }}
                  >
                    <h4 className="card-title">{c.name}</h4>
                    <img
                      className="card-img"
                      src={
                        c.type === "kitcken"
                          ? "https://cdn-icons-png.flaticon.com/512/3095/3095302.png"
                          : "https://cdn2.iconfinder.com/data/icons/furniture-home-living-glyph/64/living_room-512.png"
                      }
                      alt="Internet"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Id</th>
                <th scope="col">
                  <FormattedMessage id="Device" />
                </th>
                <th scope="col">
                  <FormattedMessage id="Value" />
                </th>
              </tr>
            </thead>
            <tbody>
              {devices.map((d, i) => (
                <tr key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{d.id == null ? "null" : d.id}</td>
                  <td>{d.name == null ? "null" : d.name}</td>
                  <td>{d.desired.value == null ? "null" : d.desired.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    <h1><FormattedMessage id="Stats" /></h1>
      <div style={{"textAlign":"center"}} id="ChartArea">
      <h5 ><FormattedMessage id="Power" /> </h5>
        <svg ref={pieChart}></svg>
      </div>
    </div>
  );
}

export default Lugar;
