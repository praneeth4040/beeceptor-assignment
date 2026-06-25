import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Request and response logging middleware
app.use((req, res, next) => {
  const receiveTime = new Date();
  console.log(`[${receiveTime.toISOString()}] Incoming Request: ${req.method} ${req.url}`);

  res.on('finish', () => {
    const sendTime = new Date();
    const duration = sendTime - receiveTime;
    console.log(`[${sendTime.toISOString()}] Outgoing Response: ${req.method} ${req.url} - Status: ${res.statusCode} (Duration: ${duration}ms)`);
  });

  next();
});


app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Beeceptor Assignment Server!' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
