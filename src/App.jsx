import { useState } from 'react';

export default function App() {
  const [token, setToken] = useState(sessionStorage.getItem('jwt_token') || '');
  const [username, setUsername] = useState('aum');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [dashboardData, setDashboardData] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setToken(data.token);
        sessionStorage.setItem('jwt_token', data.token); 
        setMessage('Logged in successfully!');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage("Error connecting to server.");
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await fetch('/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      const data = await res.json();

      if (res.ok) {
        setDashboardData(data);
        setMessage('Data fetched successfully!');
      } else {
        setMessage(data.message);
        setDashboardData(null);
        if (res.status === 403 || res.status === 401) {
          handleLogout();
        }
      }
    } catch (err) {
      setMessage("Error fetching data.");
    }
  };

  const handleLogout = () => {
    setToken('');
    setDashboardData(null);
    sessionStorage.removeItem('jwt_token');
    setMessage('Session ended / Logged out.');
  };

  if (token) {
    return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
        <h1>Secure Dashboard</h1>
        <button onClick={fetchDashboard} style={{ marginRight: '10px' }}>
          Fetch Protected Data
        </button>
        <button onClick={handleLogout}>Logout</button>
        
        {dashboardData && (
          <div style={{ marginTop: '20px', padding: '10px', background: '#eef' }}>
            <h3>{dashboardData.message}</h3>
            <p>{dashboardData.secretData}</p>
          </div>
        )}
        <p style={{ color: 'blue' }}>{message}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Login / Register</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input 
          placeholder="Username" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          style={{ display: 'block', margin: '10px 0', padding: '8px' }}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          style={{ display: 'block', margin: '10px 0', padding: '8px' }}
        />
        <button onClick={handleLogin} style={{ marginRight: '10px' }}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </form>
      <p style={{ color: 'red' }}>{message}</p>
    </div>
  );
}