import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/Employee';
import CreateEmployee from './components/CreateEmployee';
import EditEmployee from './components/EditEmployee';
import Layout from './pages/Layout';
import NavBar from './components/Navbar/Navbar';
import NotFound from './pages/PageNotFound/NotFound';
import Footer from './components/Footer';

function App() {

  // const isAuthenticated = !!localStorage.getItem('token');

  return (

    <Router>
      <>
        <NavBar />
        
      </>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          {/* <Route
            path="dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          /> */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="create-employee" element={<CreateEmployee />} />
          <Route path="edit-employee/:id" element={<EditEmployee />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
