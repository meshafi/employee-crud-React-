import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./routes/Home";
import EmployeeDetails from "./routes/EmployeeDetails";
import AddEmployee from "./routes/AddEmployee";

function App() {
  return (
    <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/:id"
            element={
              <Layout>
                <EmployeeDetails />
              </Layout>
            }
          />
          <Route
            path="/add-employee"
            element={
              <Layout>
                <AddEmployee />
              </Layout>
            }
          />
        </Routes>
    </Router>
  );
}

export default App;
