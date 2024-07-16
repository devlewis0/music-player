import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Hook de navegación

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      console.log('Response data:', res.data);
      localStorage.setItem('token', res.data.token); // Guardar el token en el almacenamiento local
      setSuccess(true);
      setError('');
      navigate('/'); // Redirigir al usuario a la página principal
    } catch (err) {
      console.error('Error response:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.msg : 'Something went wrong');
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Login successful!</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
