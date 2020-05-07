import React from "react";
import { HashRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { IconStyle } from "./assets/iconfont/iconfont";
import { GlobalStyle } from "./style";
import routes from "./routes";
import store from "./store";
import { Data } from "./components/Singers/data";
function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle></GlobalStyle>
        <IconStyle></IconStyle>
        <Data>{renderRoutes(routes)}</Data>
      </HashRouter>
    </Provider>
  );
}

export default App;
