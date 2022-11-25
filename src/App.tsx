import { Home, Login, Profile } from "routes";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { AuthWrapper } from "auth";
import Header from "features/Header";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
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
      </Routes>
    </>
  );
};

export default App;
