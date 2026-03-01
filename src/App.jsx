import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import PrivateRoute from "./components/authentication/PrivateRoute";
import { MeetingProvider } from "./context/MeetingContext";
import ErrorBoundary from "./components/ErrorBoundary";

import Home from "./pages/Home";
import AppLoader from "./components/common/AppLoader";
import "./App.css";

// Lazy pages
const Chats = lazy(() => import("./pages/Chats"));
const SimpleCalendar = lazy(() => import("./components/Calendar/Calendar"));
const NewMeeting = lazy(() => import("./components/Meet/NewMeeting"));
const Meet = lazy(() => import("./pages/Meet"));
const Login = lazy(() => import("./components/authentication/login"));
const Signup = lazy(() => import("./components/authentication/SignUp"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const VideoCall = lazy(() => import("./components/VideoCall"));
/* ---------- Layouts ---------- */

const AppLayout = () => (
  <div className="app-container">
    <SideBar />
    <div className="main-content">
      <NavBar />
      <div className="page-content">
        <Suspense fallback={<AppLoader />}>
          <Routes>
            <Route
              path="/chats"
              element={
                <PrivateRoute>
                  <Chats />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <PrivateRoute>
                  <SimpleCalendar />
                </PrivateRoute>
              }
            />
            <Route
              path="/calendar/new"
              element={
                <PrivateRoute>
                  <NewMeeting />
                </PrivateRoute>
              }
            />
            <Route
              path="/meet"
              element={
                <PrivateRoute>
                  <Meet />
                </PrivateRoute>
              }
            />
            <Route
              path="/call/:roomId"
              element={
                <PrivateRoute>
                  <VideoCall />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <MeetingProvider>
      <ErrorBoundary>
        <Suspense fallback={<AppLoader />}>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<Signup />} />

            {/* App Layout */}
            <Route path="/*" element={<AppLayout />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </MeetingProvider>
  );
}

export default App;
