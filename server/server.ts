import express, { Express, Request } from 'express';

import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import errorHandler from './middleware/error-handler';
import dbConnect from './db/dbConnect';
import { logger } from './utils/logger';


//Connect to mongoDB instance
dbConnect();

//Initializing express app object
const app: Express = express();

//Logging middleware
if (process.env.NODE_ENV === 'production') {
  app.use(
    morgan('short', {
      stream: {
        write: (message) => {
          logger.info(message)
        }
      }
    })
  );
} else {
  app.use(morgan('dev'));
}

//Body parser for parsing form data
app.use(express.urlencoded({ extended: true }));

//Body parser for parsing json
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Set security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attacks
app.use(xss());

//Trust reverse proxy for heroku, nginx
app.set('trust proxy', 1);

// TODO: Implement Rate limiting
// if (process.env.RATE_LIMIT === 'true') {
//     const limiter: Object = rateLimit({
//         windowMs: 10 * 60 * 1000, // 10 mins
//         max: 100,
//     });
//     app.use(limiter);
// }

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

//Mount routers
// app.use('/api/v1/test', testRoutes);

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Zero Pay API',
    version: '1.0.0',
    description: 'REST API for Zero Pay',
    license: {
      name: 'Licensed Under Onpar',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'Onpar',
      url: 'https://onpar.in',
    },
  },
  servers: [
    {
      url: '/',
      description: 'Generated Server',
    },
    {
      url: 'https://app.zeropay.onpar.co.in',
      description: 'ZP Hosted Development Server',
    },
    {
      url: 'http://localhost:5000',
      description: 'ZP Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res) => {
  res.status(200).json({
    health: 'check',
  });
});

//Error Handling Middleware
app.use(errorHandler);

export default app;
