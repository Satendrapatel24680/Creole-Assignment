const order = { ASC: 1, DESC: -1 };

const orderingKeys = {
  ASC: 'asc',
  DESC: 'desc'
};

const idLength = {
  LENGTH: 24
};

const objIdRgx = {
  rgx: /^[0-9a-fA-F]{24}$/
};

const defaultValue = {
  DEVICE: 'web',
  MIN: 1,
  MAX: 10,
  sort: 'createdAt'
};

const status = {
  ACTIVE: 1,
  PENDING: 0,
  INACTIVE: 3,
  APPROVAL_PENDING: 2,
  REJECTED: 4
};

const modules = {
  EXAMCENTER: 'examcenter',
  ADMIN: 'admin'
};

const route = {
  adminLogin: 'admin-login',
  examCenterLogin: 'examcenter-login'
};

const OTP_EXPIRES_IN = new Date(new Date().getTime() + 30 * 60 * 1000);

module.exports = { order, orderingKeys, idLength, defaultValue, status, route, objIdRgx, modules, OTP_EXPIRES_IN };
