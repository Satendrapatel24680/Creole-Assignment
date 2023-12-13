const { env } = require('./environment');

const role = {
  ADMIN: 'admin',
  EXAM_CENTER: 'exam center',
  ITAUDITOR: 'it auditor',
  SUPERVISOR: 'supervisor',
  PROJECT_MANAGER: 'projectmanager',
  VENDOR: 'vendor',
  SUBADMIN: 'subadmin'
};

const errorMsg = {
  EXPIRED: 'jwt expired',
  INVALID: 'invalid signature'
};

const password = {
  REGEXP: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%#*?&]{8,25}$/,
  MSG: 'Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  MINCHAR: 8,
  MAXCHAR: 25
};

const otp = {
  MSG: `Otp should be of ${env.OTP_DIGIT} digits`,
  LENGTH: Number(env.OTP_DIGIT)
};

const phone = {
  LENGTH: 10,
  REGEXP: /^\d{10}$/,
  MESSAGE: 'Mobile no should be of 10 digit'
};

const OTP = '666666';

const allowedDomains = ['com', 'net', 'in', 'co'];

const defaultPassword = 'Test@1234';

module.exports = { role, errorMsg, password, otp, phone, allowedDomains, OTP, defaultPassword };
