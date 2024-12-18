const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Mock database
const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

// Endpoint per il login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Endpoint per suggerimenti nutrizionali
app.post('/nutrition', (req, res) => {
  const { weight, height, age, goal } = req.body;

  let suggestions = [];

  if (goal === 'lose weight') {
    suggestions = [
      'Riduci l’apporto calorico giornaliero di 500-700 calorie.',
      'Aumenta il consumo di verdure e proteine magre.',
      'Esegui attività fisica regolare, come camminate o corsa.',
    ];
  } else if (goal === 'maintain weight') {
    suggestions = [
      'Mantieni un apporto calorico bilanciato in base al tuo TDEE.',
      'Assumi una quantità moderata di carboidrati, proteine e grassi.',
      'Continua con una routine fisica regolare.',
    ];
  } else if (goal === 'gain weight') {
    suggestions = [
      'Aumenta l’apporto calorico giornaliero di 300-500 calorie.',
      'Consuma cibi ricchi di calorie come noci, avocado e proteine.',
      'Allenati con esercizi di forza per aumentare la massa muscolare.',
    ];
  } else {
    suggestions = ['Obiettivo non valido.'];
  }

  res.json({ suggestions });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
