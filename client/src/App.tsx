import React, { Suspense } from "react";
import "./App.css";
import { Container } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {UserProvider} from "./context/userContext";
function App() {
  return (
    <Suspense fallback={null}>
      <Container>
          <UserProvider>
              <Router>
                  <ToastContainer />
                  <Layout />
              </Router>
          </UserProvider>
      </Container>
    </Suspense>
  );
}

export default App;
