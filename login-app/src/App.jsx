// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import React, { useState } from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      setLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleNutrition = async (e) => {
    e.preventDefault();
    const response = await fetch('/nutrition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ weight, height, age, goal }),
    });

    const data = await response.json();
    setSuggestions(data.suggestions);
  };

  return (
    <div>
      {!loggedIn ? (
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <h2>Inserisci i tuoi parametri</h2>
          <form onSubmit={handleNutrition}>
            <input
              type="number"
              placeholder="Peso (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Altezza (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <input
              type="number"
              placeholder="Età"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <select value={goal} onChange={(e) => setGoal(e.target.value)}>
              <option value="">Seleziona un obiettivo</option>
              <option value="lose weight">Perdere peso</option>
              <option value="maintain weight">Mantenere peso</option>
              <option value="gain weight">Aumentare peso</option>
            </select>
            <button type="submit">Ottieni suggerimenti</button>
          </form>
          {suggestions.length > 0 && (
            <div>
              <h3>Suggerimenti nutrizionali</h3>
              <ul>
                {suggestions.map((s, index) => (
                  <li key={index}>{s}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
