import path from 'path';
import * as dotenv from 'dotenv';

declare const process: {
  env: {
    NODE_ENV: string;
    [key: string]: string;
  };
};

let envPath;
//Load env vars according to NODE_ENV
switch (process.env.NODE_ENV) {
  case 'test':
    envPath = path.resolve(__dirname, 'test.env');
    break;
  case 'production':
    envPath = path.resolve(__dirname, 'prod.env');
    break;
  default:
    envPath = path.resolve(__dirname, 'dev.env');
}

dotenv.config({ path: envPath });

export const mongoUri = process.env.MONGO_URI;
export const qcToken = process.env.QC_TOKEN;
export const qcConsumer = process.env.QC_CONSUMER;
export const qcSecret = process.env.QC_SECRET;
export const qcUsername = process.env.QC_USERNAME;
export const qcPass = process.env.QC_PASSWORD;

export const cronToken = process.env.CRON_TOKEN;

export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpire = process.env.JWT_EXPIRE;
export const jwtCookieExpire = process.env.JWT_COOKIE_EXPIRE;

export const lmsUrl = process.env.LMS_LOAN_ROUTE;
export const lmsToken = process.env.LMS_TOKEN;

// export const bankItBaseUrl = process.env.BANKIT_BASE_URL;
// export const bankItInstId = process.env.BANKIT_INST_KEY;
// export const bankItAgentId = process.env.BANKIT_AGENT_ID;
// export const bankItIP = process.env.BANKIT_IP;

export const invoidToken = process.env.INVOID_TOKEN;

export const lmsLoanApi = process.env.LMS_LOAN_ROUTE;

export const msg91AuthKey = process.env.MSG91_AUTH_KEY;
export const msg91TemplateId = process.env.MSG91_TEMPLATE_ID;

export const smtpHost = process.env.SMTP_HOST;
export const smtpPort = process.env.SMTP_PORT;
export const smtpEmail = process.env.SMTP_EMAIL;
export const smtpPassword = process.env.SMTP_PASSWORD;
export const fromName = process.env.FROM_NAME;
export const fromEmail = process.env.FROM_EMAIL;

export const awsS3AccessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
export const awsS3SecretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

export const razorPayKeyId = process.env.RAZORPAY_KEY_ID;
export const razorPayKeySecret = process.env.RAZORPAY_KEY_SECRET;
export const razorPayWebhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

export const cashfreePaymentDomain = process.env.CASHFREE_PAYMENT_DOMAIN;
export const cashfreePaymentClientId =
  process.env.CASHFREE_PAYMENT_GATEWAY_CLIENT_ID;
export const cashfreePaymentClientSecret =
  process.env.CASHFREE_PAYMENT_GATEWAY_CLIENT_SECRET;

export const cashfreePayoutEnv = process.env.CASHFREE_PAYOUT_ENV;

export const cashfreePayoutClientId = process.env.CASHFREE_PAYOUT_CLIENT_ID;
export const cashfreePayoutClientSecret =
  process.env.CASHFREE_PAYOUT_CLIENT_SECRET;

// export const cashfreePayoutPublicKey = JSON.parse(
//   process.env.CASHFREE_PAYOUT_PUBLIC_KEY
// ).public_key;

export const fcmProjectId = process.env.FCM_PROJECT_ID;
export const fcmClientEmail = process.env.FCM_CLIENT_EMAIL;
export const fcmPrivateKey = process.env.FCM_PRIVATE_KEY;
export const fcmDatabase = process.env.FCM_DATABASE;

// Whatasapp API Key
export const whatsappAppId = process.env.WA_APP_ID;
export const whatsappServiceKey = process.env.WA_SERVICE_KEY;

export const domain = process.env.domain;

export const testPay = process.env.TEST_PAY;

const { env } = process;

export const EquifaxSecrets = {
  EQUIFAX_USER_ID: env.EQUIFAX_UID,
  EQUIFAX_PWD: env.EQUIFAX_PWD,
  EQUIFAX_MEMBER_NUMBER: env.EQUIFAX_MEMBER_NUMBER,
  EQUIFAX_SECURITY_CODE: env.EQUIFAX_SECURITY_CODE,
};
