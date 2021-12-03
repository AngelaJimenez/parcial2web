import React, { useState } from "react"

function Spaces(props){

    let [lugar] = useState(props.lugar)

    return(
        <div className = "col">
            <div className = "card">
                <div className="card-body">

                    <h4 className = "card-title">
                        {lugar.name}
                    </h4>
                    
                </div>
            </div>

        </div>
    )
}

export default Spaces