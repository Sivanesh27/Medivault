import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Validate credentials here
    navigate('/admin-dashboard');
  };

  return (
    <form onSubmit={handleLogin}>
      {/* form inputs */}
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin;
