import React from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import MovieForm from "./components/MovieForm";
import "./App.css";

function App() {
  const { id } = useParams();

  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Navigate to="movies" />} />
          <Route path="movies">
            <Route index element={<Movies />} />
            <Route path=":id" element={<MovieForm id={id} />} />
          </Route>
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
