import { Home, Login, Signup } from "routes";
import "./App.scss";
import { Route, Routes } from "react-router-dom";
import { AuthWrapper } from "auth";
import Header from "features/Header";
import Temp from "routes/Temp";

const App = () => {
  return (
    <>
      <Header />

      <main>
        <Routes>
          <Route
            path="login"
            element={<Temp></Temp>}
          />
          <Route
            path="signup"
            element={<Signup></Signup>}
          />

          <Route
            index
            element={
              <AuthWrapper>
                <Home></Home>
              </AuthWrapper>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
