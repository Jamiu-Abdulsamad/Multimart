import React from "react";
import ReactDom from "react-dom/client";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          // limit={1}
          pauseOnHover={false}
          theme="dark"
          toastClassName="custom-toast"
          style={{ width: "200px", fontSize: "14px" }}
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
