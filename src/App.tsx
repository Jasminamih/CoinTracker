import React, { useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Wellcome from "./components/Welcome";
import WelcomeFirstPage from "./pages/WelcomeFirstPage";
import WelcomeSecondPage from "./pages/WelcomeSecondPage";
import WelcomeThirdPage from "./pages/WelcomeThirdPage";
import Ovierview from "./pages/OvierviewPage";
import CategoriesPage from "./pages/CategoriesPage";
import StatisticsPage from "./pages/StatisticsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { CategoryConstructor } from "./context/CategoryContext";
import { EntriesConstructor, EntriesContext } from "./context/EntriesContext";
import { UserConstructor } from "./context/UserContext";

function App() {



  
  return (
    <div className="App">
      <BrowserRouter>
      <CategoryConstructor>
        <EntriesConstructor>
          <UserConstructor>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/welcome-1" element={<ProtectedRoute><WelcomeFirstPage /></ProtectedRoute>} />
          <Route path="/welcome-2" element={<ProtectedRoute><WelcomeSecondPage /></ProtectedRoute>} />
          <Route path="/welcome-3" element={<ProtectedRoute><WelcomeThirdPage /></ProtectedRoute>} />
          <Route path="/overview" element={  <ProtectedRoute><Ovierview/></ProtectedRoute>} />
          <Route path="/categories" element={ <ProtectedRoute><CategoriesPage/></ProtectedRoute>} />
          <Route path="/statistics" element={ <ProtectedRoute><StatisticsPage/></ProtectedRoute>} />
        </Routes>
        </UserConstructor>
        </EntriesConstructor>
        </CategoryConstructor>
      </BrowserRouter>

    </div>
  );
}

export default App;
