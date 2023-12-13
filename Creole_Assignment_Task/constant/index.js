const { env, serverType } = require('./environment');

const { role, errorMsg, password, otp, phone, allowedDomains, OTP, objIdRgx, defaultPassword } = require('./auth');

const { order, orderingKeys, idLength, defaultValue, status, route } = require('./common');

const { centerRequest, requestStatus, availability, switchOver, upsType, organizationType, propertyType, step } = require('./examCenter');

module.exports = {
  serverType,
  env,
  role,
  errorMsg,
  password,
  otp,
  phone,
  allowedDomains,
  order,
  orderingKeys,
  idLength,
  defaultValue,
  status,
  centerRequest,
  requestStatus,
  availability,
  switchOver,
  upsType,
  route,
  OTP,
  objIdRgx,
  defaultPassword,
  propertyType,
  step,
  organizationType
};
