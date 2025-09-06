import { useState } from 'react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
      } else {
        setMessage('Login failed');
      }
    } catch (err) {
      setMessage('Error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ title, price: Number(price), location, image, description }),
      });
      if (res.ok) {
        setMessage('Property added');
        setTitle(''); setPrice(''); setLocation(''); setImage(''); setDescription('');
      } else {
        setMessage('Failed to add');
      }
    } catch (err) {
      setMessage('Error');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
          <button className="btn" type="submit">Login</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required />
        <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" required />
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
        <button className="btn" type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
      <button className="btn" style={{ background: 'red', marginTop: '10px' }} onClick={() => { localStorage.removeItem('token'); setIsLoggedIn(false); }}>Logout</button>
    </div>
  );
}
