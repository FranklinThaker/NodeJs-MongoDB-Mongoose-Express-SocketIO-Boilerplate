const csv = require('csvtojson');
const jwt = require('jsonwebtoken');
const path = require('path');
const { envConstants } = require('../helpers/constants');
const {
  errorResponse,
  decrypt,
} = require('../helpers/helpers');
const { errorMessages } = require('../helpers/messages');
const { UsersModel } = require('../models/users');

const authorizationData = [];

exports.authentication = async (req, res, next) => {
  let decoded;

  if (!(req.headers && req.headers.authorization)) {
    return errorResponse(req, res, errorMessages.NO_TOKEN_PROVIDED, 401);
  }

  const token = req.headers.authorization;

  try {
    const decryptedToken = decrypt(token);
    decoded = jwt.decode(decryptedToken);
    jwt.verify(decryptedToken, envConstants.SECRET);
  } catch (error) {
    if (error.message === 'jwt expired') {
      return errorResponse(req, res, errorMessages.TOKEN_EXPIRED, 401);
    }
    return errorResponse(req, res, error.message, 401);
  }

  const data = await UsersModel.findOne({ _id: decoded._id }).lean();
  if (!data) return errorResponse(req, res, errorMessages.USER_NOT_EXIST, 401);
  if (!data.status) return errorResponse(req, res, errorMessages.USER_ACC_DISABLED, 401);

  req.user = data;

  res.locals.ROLE = data.role;
  res.locals.METHOD = req.method;
  res.locals.URL = req.url;

  return next();
};

const validateURL = (req, authorizeURL) => {
  const requestURL = req.originalUrl;
  let systemURL = '';
  if ((req.route.path).length > 1) {
    systemURL = req.baseUrl + req.route.path;
  } else {
    systemURL = req.baseUrl;
  }
  const policyURL = authorizeURL;
  if (requestURL === systemURL && systemURL === policyURL) return true;

  const lastSegmentRequestURL = requestURL.substring(requestURL.lastIndexOf('/') + 1);
  const lastSegmentSystemURL = systemURL.substring(systemURL.lastIndexOf('/') + 1);
  const lastSegmentPolicyURL = policyURL.substring(policyURL.lastIndexOf('/') + 1);
  if (lastSegmentRequestURL && lastSegmentSystemURL === lastSegmentPolicyURL) return true;

  return false;
};

exports.authorization = async (req, res, next) => {
  for (let i = 0; i < authorizationData.length; i += 1) {
    if (authorizationData[i].role === res.locals.ROLE) {
      if (authorizationData[i].method === res.locals.METHOD || authorizationData[i].method === '*') {
        const isValidated = validateURL(req, authorizationData[i].url);
        if (isValidated) return next();
      }
    }
  }
  return errorResponse(req, res, errorMessages.YOU_ARE_NOT_AUTHORIZED, 401);
};

exports.getROLES = async () => {
  const csvPath = path.resolve(path.join(__dirname, 'policy.csv'));

  await csv()
    .fromFile(csvPath)
    .then((jsonObj) => {
      authorizationData.push(...jsonObj);
    });
};
