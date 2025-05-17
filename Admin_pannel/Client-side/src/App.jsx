import "./App.css";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import HomePage from "./Components/pages/home";
import About from "./Components/pages/about";
import LoginPage from "./Components/pages/login-page";
import Registration from "./Components/pages/registration";
import ErrorPage from "./Components/pages/error-page";
import NavBar from "./Components/navigations-section/nav-page";
import FooterPage from "./Components/footer";
import ContactPage from "./Components/pages/contact-page";
import LogOutPage from "./Components/pages/logout-page";

// admin layout & pages
import AdminLayout from "./Components/layouts/Admin-Layout";
import UserAdmin from "./Components/pages/user-admin";
import ContactAdmin from "./Components/pages/contact-admin";
import ServiceAdmin from "./Components/pages/services-admin";
import EditAdmin from "./Components/pages/EditAdmin";

import ProductPage from "./Components/pages/products";

function AppWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <NavBar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOutPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<ErrorPage />} />

        {/* nested admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<UserAdmin />} />
          <Route path="contact" element={<ContactAdmin />} />
          <Route path="services" element={<ServiceAdmin />} />
          <Route path="users/update/:id" element={<EditAdmin />} />
        </Route>
      </Routes>

      {!isAdminRoute && <FooterPage />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/">
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
