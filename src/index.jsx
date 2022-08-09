import { createRoot } from "react-dom/client";
import React from 'react';
import App from './App.jsx'



const root = createRoot(document.getElementById("root"));

function Index() {
    return(
      <div>
        <App/>
      </div>
    )
}

root.render(<Index />);

