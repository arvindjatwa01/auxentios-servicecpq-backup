import React, { useState } from "react";
// Handle console logs
import "utils/dropConsole";
// Styles
import "fontsource-roboto";
import { RouterConfig } from "navigation/RouterConfig";
import "./App.css";
import { ProvideAuth } from "navigation/Auth/ProvideAuth";
import LoaderComponent from "pages/Common/LoaderComponent";
const App= () => {
  return (
      <div>
         <LoaderComponent />
          <ProvideAuth>
              <RouterConfig />
          </ProvideAuth>
      </div>
  );

};

export default App;
