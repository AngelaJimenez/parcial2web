import React from 'react';

import Lugar from "./lugar";
import { FormattedMessage } from "react-intl";
function App() {
  return (
    <div className="container">
       <h1><FormattedMessage id="MySpaces"/></h1>
      <Lugar/>
    </div>
  );
}

export default App;
