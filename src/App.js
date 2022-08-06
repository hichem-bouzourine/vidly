import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/MovieForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const jwt = localStorage.getItem("token");
      const decoded = jwtDecode(jwt);
      setUser(decoded);
    } catch (error) {}
  }, []);

  const { pathname } = useLocation();
  const id = pathname.substring(8, pathname.length);

  const navigate = useNavigate();

  return (
    <main className="container">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<NavBar user={user} />}>
          <Route index element={<Navigate to="movies" />} />
          <Route path="movies">
            <Route index element={<Movies user={user} navigate={navigate} />} />
            <Route
              path=":id"
              element={
                user ? (
                  <MovieForm id={id} navigate={navigate} />
                ) : (
                  <LoginForm
                    user={user}
                    navigate={navigate}
                    pathname={pathname}
                  />
                )
              }
            />
          </Route>
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route
            path="login"
            element={
              <LoginForm user={user} navigate={navigate} pathname={pathname} />
            }
          />
          <Route path="logout" element={<Logout />} />
          <Route
            path="register"
            element={<RegisterForm navigate={navigate} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
