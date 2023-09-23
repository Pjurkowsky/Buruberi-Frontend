import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import UserPanel from "./components/UserPanel";

function App() {
  return (
    <div className="flex justify-center h-screen">
      <Router>
        <Routes>
          <Route path="/admin/*" element={<AdminPanel />}></Route>
          <Route path="/" element={<UserPanel />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
