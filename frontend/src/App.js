import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyRecipes from "./screens/MyRecipes/MyRecipes";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateRecipe from "./screens/CreateRecipe/CreateRecipe";
import SingleRecipe from "./screens/SingleRecipe/SingleRecipe";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/createrecipe" element={<CreateRecipe />} />
        <Route patch="/recipe/:id" element={<SingleRecipe />} />
        <Route path="/myrecipes" element={<MyRecipes />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
