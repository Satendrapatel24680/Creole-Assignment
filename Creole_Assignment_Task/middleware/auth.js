const jwt = require('jsonwebtoken');
const response = require('../validation/response');
const httpStatus = require('http-status');
const commonService = require('../common/commonService');
const { userModel } = require('../model/product');
const { env, errorMsg, role, status } = require('../constant/index');



// This function is used for generate jwt token

exports.generateAuthJwt = (payload) => {
  const { expireIn, ...params } = payload;
  const token = jwt.sign(params, 'abc123');
  if (!token) {
    return false;
  }
  return token;
};

exports.verifyAuthToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.UNAUTHORIZED);
    }
    token = token.replace(/^Bearer\s+/, '');

    jwt.verify(token, env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        let msgCode = 'SOMETHING_WRONG';
        if (error.message === errorMsg.EXPIRED) {
          msgCode = 'SOMETHING_WRONG';
        }
        return response.error(req, res, { msgCode }, httpStatus.UNAUTHORIZED);
      }
      const checkJwt = await commonService.getByCondition(Session, { 'userId': decoded.id, 'jwt': token });
      if (!checkJwt) {
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.UNAUTHORIZED);
      } else {
        req.data = decoded;
        return next();
      }
    });
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

exports.verifyLinkToken = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return response.error(req, res, { msgCode: 'MISSING_TOKEN' }, httpStatus.UNAUTHORIZED);
    }
    jwt.verify(token, env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        let msgCode = 'SOMETHING_WRONG';
        if (error.message === errorMsg.EXPIRED) {
          msgCode = 'SOMETHING_WRONG';
        }
        return response.error(req, res, { msgCode }, httpStatus.UNAUTHORIZED);
      }
      const checkJwt = await commonService.getByCondition(User, { _id: decoded.id, link: token, isActive: true });
      if (!checkJwt) {
        return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.UNAUTHORIZED);
      } else {
        req.data = decoded;
        return next();
      }
      // req.data = decoded;
      // return next();
    });
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.UNAUTHORIZED);
    }
    jwt.verify(token, env.SECRET_KEY, async (error, decoded) => {
      if (error) {
        let msgCode = 'SOMETHING_WRONG';
        if (error.message === errorMsg.EXPIRED) {
          msgCode = 'SOMETHING_WRONG';
        }
        return response.error(req, res, { msgCode }, httpStatus.UNAUTHORIZED);
      }
      // const checkJwt = await commonService.getByCondition(User, { _id: decoded.id, link: token });
      // if (!checkJwt) {
      //   return response.error(req, res, { msgCode: 'INVALID_TOKEN' }, httpStatus.UNAUTHORIZED);
      // } else {
      //   req.data = decoded;
      //   return next();
      // }
      req.data = decoded;
      return next();
    });
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
  }
};

exports.emailAlreadyExist = async (req, res, next) => {
  try {
    const { email } = req.body;
    const condition = { email: email.toLowerCase(), $ne: { status: status.INACTIVE } };
    const checkUserExist = await commonService.getByCondition(User, condition);
    if (checkUserExist) {
      return response.error(req, res, { msgCode: 'EMAIL_EXISTS' }, httpStatus.CONFLICT);
    }
    return next();
  } catch (err) {
    console.log(err);
    return response.error(req, res, { msgCode: 'SOMETHING_WRONG' }, httpStatus.INTERNAL_SERVER_ERROR);
  }
};