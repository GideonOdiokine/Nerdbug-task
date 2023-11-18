// App.js
// import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom";

import Home from './pages/Home';
import Details from './pages/Details';


const App = () => {




  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
