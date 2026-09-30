import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Daily from "./pages/Daily";
import Weekly from "./pages/Weekly";
import ImportantDays from "./pages/ImportantDays";
import Calendar from "./pages/Calendar";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/daily"
          element={<Daily />}
        />

        <Route
          path="/weekly"
          element={<Weekly />}
        />

        <Route
          path="/important"
          element={<ImportantDays />}
        />

        <Route
          path="/calendar"
          element={<Calendar />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;