import React, { useState, useEffect } from 'react';
import GlobalStyle from './styles/GlobalStyles';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import ManagerDashboard from './components/Dashboard/ManagerDashboard';
import TravelAdminDashboard from './components/Dashboard/TravelAdminDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { lightTheme, darkTheme, toggleTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';

const App = () => {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setTheme(storedTheme === 'light' ? lightTheme : darkTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme === lightTheme ? 'light' : 'dark');
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prevTheme => toggleTheme(prevTheme));
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Navbar handleThemeToggle={handleThemeToggle} />
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute roles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager"
            element={
              <ProtectedRoute roles={['manager']}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/travel-admin"
            element={
              <ProtectedRoute roles={['travel-admin']}>
                <TravelAdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <ProtectedRoute roles={['employee']}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
