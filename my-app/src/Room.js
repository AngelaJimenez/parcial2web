import React, { useState } from "react"

function Room(props){

    let [cuarto] = useState(props.cuarto)

    return(
        <div className = "col">
            <div className = "card">
                <div className="card-body">

                    <h4 className = "card-title">
                        {cuarto.name}
                    </h4>
                    
                </div>
            </div>

        </div>
    )
}

export default Room