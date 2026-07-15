import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { setUser } from './store/slices/authSlice';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        dispatch(setUser(userData));
      } catch (error) {
        console.error('Error al cargar usuario:', error);
      }
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50">
      {isAuthenticated && user ? <Dashboard /> : <Login />}
    </div>
  );
}

export default App;
