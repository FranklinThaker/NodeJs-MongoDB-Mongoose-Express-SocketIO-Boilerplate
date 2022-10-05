const crypto = require('crypto');

const {
  successResponse,
  errorResponse,
  encrypt,
  generateJWTtoken,
  comparePassword,
} = require('../../../helpers/helpers');

const { successMessages, errorMessages } = require('../../../helpers/messages');
const UsersModel = require('../../../models/users');

exports.register = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };

    param.password = crypto.createHash('md5').update(param.password).digest('hex');

    const data = await UsersModel.findOneAndUpdate({
      email: param.email.toLowerCase(),
    }, {
      name: param.name,
      email: param.email.toLowerCase(),
      password: param.password,
      role: param.role || 'user',
      status: true,
    }, {
      new: true,
      upsert: true,
    });

    return successResponse(req, res, data, successMessages.REGISTRATION_DONE);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };

    const user = await UsersModel.findOne({ email: param.email }).lean();
    if (!user) return errorResponse(req, res, errorMessages.INVALID_UNAME_PWORD, 401);

    const output = comparePassword(param.password, user.password);
    if (!output) return errorResponse(req, res, errorMessages.INVALID_UNAME_PWORD, 401);

    const token = encrypt(generateJWTtoken({ _id: user._id, role: user.role }));

    const data = {
      user,
      token,
    };

    return successResponse(req, res, data, successMessages.LOGGED_IN);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.profile = async (req, res) => {
  const data = await UsersModel.findOne({ _id: req.user._id }).lean();
  return successResponse(req, res, data, successMessages.DATA_FETCHED);
};

exports.getAll = async (req, res) => {
  const data = await UsersModel.find({}).lean();
  return successResponse(req, res, data, successMessages.DATA_FETCHED);
};

exports.findById = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const data = await UsersModel.findOne({ _id: param.userId }).lean();
    return successResponse(req, res, data, successMessages.DATA_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const data = await UsersModel.findOneAndDelete({ _id: param.userId });
    return successResponse(req, res, data, successMessages.DATA_DELETED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
