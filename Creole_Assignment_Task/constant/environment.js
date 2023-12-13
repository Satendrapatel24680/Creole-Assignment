
const env = {
  PORT: process.env.PORT,
  MONGODB_USER_URI: process.env.MONGODB_USER_URI,
  NODE_ENV: process.env.NODE_ENV,
  API_KEY: process.env.API_KEY,
  SECRET_KEY: process.env.SECRET_KEY,
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN,
  OTP_DIGIT: process.env.OTP_DIGIT,
  SALT_ROUND: process.env.SALT_ROUND,
  OTP_EXPIRES_IN: process.env.OTP_EXPIRES_IN,
  MAX_LOGIN_DEVICE: process.env.MAX_LOGIN_DEVICE,
  SG_APIKEY: process.env.SG_APIKEY,
  SG_API_KEY_ID: process.env.SG_API_KEY_ID,
  SG_EMAIL: process.env.SG_EMAIL,
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASS: process.env.SMTP_PASS,
  API_URL: process.env.API_URL,
  SOUTH1_EMAIL: process.env.SOUTH1_EMAIL,
  S1_SG_APIKEY: process.env.S1_SG_APIKEY,
  S1_SG_API_KEY_ID: process.env.S1_SG_API_KEY_ID,
  NORTH1_EMAIL: process.env.NORTH1_EMAIL,
  N1_SG_APIKEY: process.env.N1_SG_APIKEY,
  N1_SG_API_KEY_ID: process.env.N1_SG_API_KEY_ID,
  WEST1_EMAIL: process.env.WEST1_EMAIL,
  W1_SG_API_KEY_ID: process.env.W1_SG_API_KEY_ID,
  W1_SG_APIKEY: process.env.W1_SG_APIKEY,
  SOUTH2_EMAIL: process.env.SOUTH2_EMAIL,
  S2_SG_API_KEY_ID: process.env.S2_SG_API_KEY_ID,
  S2_SG_APIKEY: process.env.S2_SG_APIKEY,
  NORTH2_EMAIL: process.env.NORTH2_EMAIL,
  N2_SG_API_KEY_ID: process.env.N2_SG_API_KEY_ID,
  N2_SG_APIKEY: process.env.N2_SG_APIKEY,
  WEST2_EMAIL: process.env.WEST2_EMAIL,
  W2_SG_API_KEY_ID: process.env.W2_SG_API_KEY_ID,
  W2_SG_APIKEY: process.env.W2_SG_APIKEY,
  EAST_EMAIL: process.env.EAST_EMAIL,
  E_SG_API_KEY_ID: process.env.E_SG_API_KEY_ID,
  E_SG_APIKEY: process.env.E_SG_APIKEY,
  NORTH_EAST_EMAIL: process.env.NORTH_EAST_EMAIL,
  NE_SG_API_KEY_ID: process.env.NE_SG_API_KEY_ID,
  NE_SG_APIKEY: process.env.NE_SG_APIKEY

};

const serverType = {
  DEVELOPMENT: 'DEVELOPMENT',
  STAGE: 'STAGE',
  TEST: 'TEST',
  PRODUCTION: 'PRODUCTION'
};

module.exports = { env, serverType };
