import React from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/MovieForm";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const { pathname } = useLocation();
  const id = pathname.substring(8, pathname.length);

  const navigate = useNavigate();

  return (
    <main className="container">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Navigate to="movies" />} />
          <Route path="movies">
            <Route index element={<Movies navigate={navigate} />} />
            <Route
              path=":id"
              element={<MovieForm id={id} navigate={navigate} />}
            />
          </Route>
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="login" element={<LoginForm />} />
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
