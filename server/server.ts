import express, { Express } from 'express';

import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import morgan from 'morgan';

import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import errorHandler from './middleware/error-handler';
import dbConnect from './db/dbConnect';
import { logger } from './utils/logger';

import auth from './routes/auth';
import user from './routes/user';
import notification from './routes/notification';
import ecom from './routes/ecommerce';
import payment from './routes/payment';
import merchant from './routes/merchant';
import repayment from './routes/repayment';
import dasboard from './routes/dasboard';
import webhooks from './routes/webhooks';
import bankIt from './routes/bankIt';
import invoid from './routes/invoid';
import cardRoutes from './routes/quickCilver';
import inviteRoutes from './routes/invite';
import testRoutes from './routes/tests';

//Connect to mongoDB instance
dbConnect();

//Initializing express app object
const app: Express = express();

//Logging middleware
if (process.env.NODE_ENV === 'production') {
  app.use(
    morgan('short', {
      stream: {
        write: function (message, encoding) {
          logger.info(message);
        },
      },
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

// // Rate limiting
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
app.use('/api/v1/auth', auth);
app.use('/api/v1/user', user);
app.use('/api/v1/notification', notification);
app.use('/api/v1/ecom', ecom);
app.use('/api/v1/payment', payment);
app.use('/api/v1/merchant', merchant);
app.use('/api/v1/repayment', repayment);
app.use('/api/v1/dashboard', dasboard);
app.use('/api/v1/invoid', invoid);
app.use('/wh/card', webhooks);
app.use('/api/v1/card', bankIt);
app.use('/api/v1/gift-card', cardRoutes);
app.use('/api/v1/invite', inviteRoutes);
app.use('/api/v1/test', testRoutes);

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
      url: 'https://zeropay.onpar.co.in',
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

app.get('/', (req, res) => {
  res.status(200).json({
    health: 'check',
  });
});

//Error Handling Middleware
app.use(errorHandler);

export default app;
