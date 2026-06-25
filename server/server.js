import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// A simple root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Beeceptor Assignment Server!' });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
