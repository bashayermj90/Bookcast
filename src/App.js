import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query/queryClient";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import User from "./pages/User";
import ProtectedRoute from "./Compnents/ProtectedRoute";
import LoginContext from "./Context/LoginContext";
import Checkout from "./pages/Checkout";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Favorite from "./pages/Favorite";
import SignUp from "./pages/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Books" element={<Books />} />
                <Route path="/Books/:id/*" element={<BookDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />

                <Route
                  path="/user"
                  element={
                    <ProtectedRoute>
                      <User />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/favorites"
                  element={
                    <ProtectedRoute>
                      <Favorite />{" "}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </BrowserRouter>
          </LoginContext.Provider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
}

export default App;
