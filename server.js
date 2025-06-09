require('dotenv').config();
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const winston = require('winston');

// Configure logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            frameAncestors: ["'none'"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'", "https://cdn.tailwindcss.com"],
            styleSrc: ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            connectSrc: ["'self'"]
        }
    },
    crossOriginEmbedderPolicy: true,
    crossOriginOpenerPolicy: true,
    crossOriginResourcePolicy: { policy: "same-site" },
    dnsPrefetchControl: true,
    frameguard: false, // Disabled as we're using CSP frame-ancestors
    hidePoweredBy: true,
    hsts: true,
    ieNoOpen: true,
    noSniff: true,
    originAgentCluster: true,
    permittedCrossDomainPolicies: true,
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
    xssFilter: false // Disabled as we're using CSP
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Compression middleware
app.use(compression());

// CORS configuration
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
    methods: ['GET', 'HEAD'],
    allowedHeaders: ['Content-Type']
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', corsOptions.origin);
    res.header('Access-Control-Allow-Methods', corsOptions.methods.join(','));
    res.header('Access-Control-Allow-Headers', corsOptions.allowedHeaders.join(','));
    next();
});

// Serve static files with security headers
app.use(express.static('.', {
    setHeaders: (res, path) => {
        // Set content type with charset
        if (path.endsWith('.html')) {
            res.set('Content-Type', 'text/html; charset=utf-8');
        } else if (path.endsWith('.css')) {
            res.set('Content-Type', 'text/css; charset=utf-8');
        } else if (path.endsWith('.js')) {
            res.set('Content-Type', 'application/javascript; charset=utf-8');
        }

        // Cache control for static assets
        if (path.match(/\.(jpg|jpeg|png|gif|ico|css|js)$/)) {
            res.set('Cache-Control', 'public, max-age=31536000, immutable');
        } else {
            res.set('Cache-Control', 'no-cache');
        }

        // Security headers
        res.set('X-Content-Type-Options', 'nosniff');
        res.removeHeader('X-XSS-Protection');
        res.removeHeader('X-Frame-Options');
        res.removeHeader('Server');
        res.removeHeader('X-Powered-By');
    }
}));

// Directory listing handler -- THIS IS NOT USED BY THE CLIENT-SIDE
/*
const handleDirectoryListing = async (req, res) => {
    try {
        const dirPath = path.join(__dirname, req.path);
        logger.info(`Reading directory: ${dirPath}`);
        
        // Validate path to prevent directory traversal
        const normalizedPath = path.normalize(dirPath);
        if (!normalizedPath.startsWith(path.join(__dirname, 'GTAVI_'))) {
            throw new Error('Invalid directory path');
        }

        await fs.access(normalizedPath);
        const files = await fs.readdir(normalizedPath);
        logger.info(`Files found in ${dirPath}: ${files.length} files`);
        res.json(files);
    } catch (error) {
        logger.error(`Error reading directory: ${error.message}`);
        if (error.code === 'ENOENT') {
            return res.status(404).json({ error: 'Directory not found' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
};
*/

// Routes - REMOVED. express.static will handle serving all files.
// app.get('/GTAVI_Screenshots/*', handleDirectoryListing);
// app.get('/GTAVI_Videos/*', handleDirectoryListing);

// Add routes to serve actual files - REMOVED
// app.get('/GTAVI_Screenshots/*', (req, res) => {
//     const filePath = path.join(__dirname, req.path);
//     res.sendFile(filePath);
// });

// app.get('/GTAVI_Videos/*', (req, res) => {
//     const filePath = path.join(__dirname, req.path);
//     res.sendFile(filePath);
// });

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(`Server error: ${err.message}`);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, () => {
    logger.info(`Server running at http://localhost:${port}`);
    logger.info(`Current working directory: ${__dirname}`);
}); 