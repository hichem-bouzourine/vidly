import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/common/navBar";
import Movies from "./components/movies";
import Customers from "./components/common/customers";
import Rentals from "./components/common/rentals";
import NotFound from "./components/common/notFound";
import "./App.css";

function App() {
  return (
    <main className="container">
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<Navigate to="movies" />} />
          <Route path="movies" element={<Movies />} />
          <Route path="customers" element={<Customers />} />
          <Route path="rentals" element={<Rentals />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
