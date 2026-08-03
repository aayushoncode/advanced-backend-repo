import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Verify from "./pages/Verify.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
  s;
};

export default App;

// import React from "react";

// const App = () => {
//   return (
//     <div>
//       <BrowserRouter>
//         djkfj
//         <Routes>
//           <Route />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;
