import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

// pages
import Supplier from "./pages/Supplier";
import Prosthetic from "./pages/Prosthetic";
import Doctor from "./pages/Doctor";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Patient from "./pages/Patient";
import SuppliedBy from "./pages/SuppliedBy";
import EquippedBy from "./pages/EquippedBy";
import Operation from "./pages/Operation";
import Order from "./pages/Order";
import CreateSupplier from "./pages/CreateSupplier";
import CreateProsthetic from "./pages/CreateProsthetic";
import UpdateSupplier from "./pages/UpdateSupplier";
import UpdateDoctor from "./pages/UpdateDoctor";
import UpdateProsthetic from "./pages/UpdateProsthetic";
import UpdateOperation from "./pages/UpdateOperation";
import UpdateOrder from "./pages/UpdateOrder";
import CreateSuppliedBy from "./pages/CreateSuppliedBy";
import CreateEquippedBy from "./pages/CreateEquippedBy";
import CreatePatient from "./pages/CreatePatient";
import UpdatePatient from "./pages/UpdatePatient";
import CreateOperation from "./pages/CreateOperation";
import CreateOrder from "./pages/CreateOrder";
import CreateDoctor from "./pages/CreateDoctor";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <nav>
        <h1 style={{ fontSize: "40px" }}>
          Welcome Admin to the Prosthetics Database
        </h1>
        {isLoggedIn && (
          <div className="headerButtons">
            <Link style={{ textDecoration: "none" }} to="/home">
              Home
            </Link>
            <Link style={{ textDecoration: "none" }} to="/supplier">
              Suppliers
            </Link>
            <Link style={{ textDecoration: "none" }} to="/doctor">
              Doctors
            </Link>
            <Link style={{ textDecoration: "none" }} to="/patient">
              Patients
            </Link>
            <Link style={{ textDecoration: "none" }} to="/prosthetics">
              Prosthetics
            </Link>
            <Link style={{ textDecoration: "none" }} to="/order">
              Orders
            </Link>
            <Link style={{ textDecoration: "none" }} to="/operation">
              Operations
            </Link>
            <Link style={{ textDecoration: "none" }} to="/suppliedby">
              Supplied by
            </Link>
            <Link style={{ textDecoration: "none" }} to="/equippedby">
              Equipped by
            </Link>
            <a style={{ textAlign: "right" }}>
              <Link
                style={{ color: "#b80e0e", textDecoration: "none" }}
                to="/"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </a>
          </div>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/operation" element={<Operation />} />
        <Route path="/order" element={<Order />} />
        <Route path="/patient" element={<Patient />} />
        <Route path="/prosthetics" element={<Prosthetic />} />
        <Route path="/suppliedby" element={<SuppliedBy />} />
        <Route path="/equippedby" element={<EquippedBy />} />
        <Route path="/createOperation" element={<CreateOperation />} />
        <Route path="/createorder" element={<CreateOrder />} />
        <Route path="/createsuppliedby" element={<CreateSuppliedBy />} />
        <Route path="/createequippedby" element={<CreateEquippedBy />} />
        <Route path="/createsupplier" element={<CreateSupplier />} />
        <Route path="/createpatient" element={<CreatePatient />} />
        <Route path="/createprosthetics" element={<CreateProsthetic />} />
        <Route path="/createDoctor" element={<CreateDoctor />} />
        <Route path="/order:id" element={<UpdateOrder />} />
        <Route path="/supplier:ID" element={<UpdateSupplier />} />
        <Route path="/patient:id" element={<UpdatePatient />} />
        <Route path="/prosthetics:id" element={<UpdateProsthetic />} />
        <Route path="/doctor:ID" element={<UpdateDoctor />} />
        <Route path="/operation:id" element={<UpdateOperation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
