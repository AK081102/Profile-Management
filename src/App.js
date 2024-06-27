import { Outlet, useNavigate } from 'react-router-dom';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';


function App() {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  useEffect(() =>{
    navigate('/user-profile')
  }, [])


  useEffect(() => {
    if (!token) {
      navigate('/sign-in');
    }
  }, [navigate, token]);


  return (
    <main>
      <ToastContainer/>
      {/* <h1>Main Page</h1> */}
      <Outlet /> {/* This renders the child routes */}
    </main>
  );
}

export default App;
