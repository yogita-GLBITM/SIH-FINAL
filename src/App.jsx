// import {useState} from 'react';import {Routes,Route,Navigate} from 'react-router-dom';import TeamDashboard from "./components/TeamDashboard/TeamDashboard";import LoginPage from './components/Login/LoginPage';import ExplorePage from './pages/ExplorePage';
// export default function App(){const [user,setUser]=useState(null);return <Routes><Route path="/" element={<LoginPage onLogin={setUser}/>}/><Route path="/team" element={user?<TeamDashboard user={user}/>:<Navigate to="/" replace/>}/><Route path="/explore" element={user?<ExplorePage user={user}/>:<Navigate to="/" replace/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}


import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./components/Login/LoginPage";
import ExplorePage from "./pages/ExplorePage";
import TeamDashboard from "./components/TeamDashboard/TeamDashboard";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/"
        element={<LoginPage onLogin={setUser} />}
      />

      {/* Team Member Dashboard */}
      <Route
        path="/team"
        element={
          <TeamDashboard user={user} />
        }
      />

      {/* Explore */}
      <Route
        path="/explore"
        element={
          user ? (
            <ExplorePage user={user} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* Unknown URL */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
}