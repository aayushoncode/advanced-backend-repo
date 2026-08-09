import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Verify from "./pages/Verify.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { ToastContainer } from "react-toastify";
import Loading from "./Loading.jsx";
import { AppData } from "./context/AppContext.jsx";
import LogOut from "./pages/LogOut.jsx";

const App = () => {
  const { isAuth, loading } = AppData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={isAuth ? <Home /> : <Login />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/Login" element={isAuth ? <Home /> : <Login />} />
            <Route
              path="/register"
              element={isAuth ? <Home /> : <Register />}
            />
            <Route
              path="/verifyOtp"
              element={isAuth ? <Home /> : <VerifyOtp />}
            />
            <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />x
            <Route path="/logout" element={<LogOut />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/loading" element={<Loading />} /> */}
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      )}
    </>
  );
  s;
};

export default App;

// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// import Register from "./pages/Register.jsx";
// import Verify from "./pages/Verify.jsx";
// import VerifyOtp from "./pages/VerifyOtp.jsx";
// import Dashboard from "./pages/Dashboard.jsx";
// import { ToastContainer } from "react-toastify";
// import { AppData } from "./context/AppContext.jsx"; // Import your context

// const App = () => {
//   // Bring in the auth state and loading status from your context
//   const { isAuth, loading } = AppData();

//   // Prevent routing before the initial auth check finishes
//   if (loading) {
//     return (
//       <div className="flex h-screen items-center justify-center">
//         Loading...
//       </div>
//     );
//   }

//   return (
//     <div>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />

//           {/* Public Routes: Redirect logged-in users away from auth pages */}
//           <Route
//             path="/login"
//             element={isAuth ? <Navigate to="/dashboard" /> : <Login />}
//           />
//           <Route
//             path="/register"
//             element={isAuth ? <Navigate to="/dashboard" /> : <Register />}
//           />

//           {/* Verification Routes */}
//           <Route path="/verify" element={<Verify />} />
//           <Route path="/verifyOtp" element={<VerifyOtp />} />

//           {/* Protected Routes: Kick unauthenticated users back to login */}
//           <Route
//             path="/dashboard"
//             element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
//           />
//         </Routes>
//         <ToastContainer />
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;
