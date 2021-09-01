import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Movie from "./components/Movie";
import NotFound from "./components/NotFound";
import UserProvider from "./Context";
import { GlobalStyle } from "./GlobalStyle";
const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/:movieId" element={<Movie />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <GlobalStyle />
      </UserProvider>
    </Router>
  );
};

export default App;
