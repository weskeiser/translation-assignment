import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider as ReduxProvider } from "react-redux";
import { store } from "./appRedux/store";

import "./global/css/index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import App from "./App";
import { Login, Home, Error } from "./routes";
import { AuthWrapper } from "auth";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/*"
      element={<App />}
      errorElement={<Error />}
    >
      <Route
        path="login"
        element={<Login></Login>}
      />

      <Route
        index
        element={
          <AuthWrapper>
            <Home></Home>
          </AuthWrapper>
        }
      />
    </Route>
  )
);

root.render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </StrictMode>
);
