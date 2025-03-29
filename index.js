const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();

app.use(cors({ origin: '*' }));
app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "http://localhost:5000"],
          styleSrc: ["'self'", "'unsafe-inline'", "https:"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          connectSrc: ["'self'", "http://localhost:5000"],
        },
      },
      crossOriginResourcePolicy: { policy: "cross-origin" }
    })
  );
app.use(express.json());
app.use('/uploads', cors(), express.static('uploads'));
// Routes
app.use('/api/news', require('./routes/news'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/events', require('./routes/events'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/initiatives', require('./routes/initiatives'));
app.use('/api/overview', require('./routes/overview'));
app.use('/api/map', require('./routes/map'));
app.use('/api/homepage', require('./routes/homepage'));
app.use('/api/admin/auth', require('./routes/adminAuth'));
app.use('/api/upload', require('./routes/upload'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
