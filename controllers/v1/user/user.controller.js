const crypto = require('crypto');

const {
  successResponse,
  errorResponse,
  encrypt,
  generateJWTtoken,
  comparePassword,
} = require('../../../helpers/helpers');
const { successMessages, errorMessages } = require('../../../helpers/messages');
const { UsersModel, ignoredFields } = require('../../../models/users');

exports.register = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };

    const hashedPassword = crypto.createHash('md5').update(param.password).digest('hex');
    const user = await new UsersModel({
      name: param.name.toLowerCase(),
      email: param.email.toLowerCase(),
      password: hashedPassword,
      role: param.role,
    }).save();

    const data = await UsersModel.findOne({ _id: user._id }).lean().select(ignoredFields);
    return successResponse('users', res, [data], successMessages.REGISTRATION_DONE);
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
    const userData = await UsersModel.findOne({ _id: user._id }).lean().select(ignoredFields);
    return successResponse('users', res, [{ ...userData, token }], successMessages.LOGGED_IN);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.getAll = async (req, res) => {
  const data = await UsersModel.find().lean().select(ignoredFields);
  return successResponse('users', res, data, successMessages.DATA_FETCHED);
};

exports.findById = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const data = await UsersModel.findOne({ _id: param.userId }).lean().select(ignoredFields);
    if (data) {
      return successResponse('users', res, [data], successMessages.DATA_FETCHED);
    }
    return errorResponse(req, res, errorMessages.INVALID_USER_ID, 400);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.findByIdAndUpdate = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const data = await UsersModel.findOneAndUpdate({ _id: param.userId }, {
      name: param.name,
    }, {
      new: true,
    }).lean().select(ignoredFields);
    if (data) {
      return successResponse('users', res, [data], successMessages.DATA_FETCHED);
    }
    return errorResponse(req, res, errorMessages.INVALID_USER_ID, 400);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };
    const deletedUserDetails = await UsersModel.findOne({ _id: param.userId }).lean().select(ignoredFields);
    await UsersModel.findByIdAndDelete(param.userId);
    if (deletedUserDetails) {
      return successResponse('users', res, [deletedUserDetails], successMessages.DATA_DELETED);
    }
    return errorResponse(req, res, errorMessages.INVALID_USER_ID, 400);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.profile = async (req, res) => {
  const data = await UsersModel.findOne({ _id: req.user._id }).lean();
  return successResponse('users', res, [data], successMessages.DATA_FETCHED);
};
