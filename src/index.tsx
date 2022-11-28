import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Provider as ReduxProvider } from "react-redux";

import "./global/css/index.css";
import { store } from "./appRedux/store";
import { AuthWrapper } from "auth";
import App from "./App";
import { Login, Home, Profile } from "./routes";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/*"
      element={<App />}
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

      <Route
        path="profile"
        element={
          <AuthWrapper>
            <Profile></Profile>
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
