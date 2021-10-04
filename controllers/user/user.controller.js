const crypto = require('crypto');
const UsersModel = require('../../models/users');

const {
  successResponse,
  errorResponse,
  encrypt,
  generateJWTtoken,
} = require('../../helpers/helpers');

const { successResponses, errorResponses } = require('../../helpers/messages');

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
    }, {
      new: true,
      upsert: true,
    });

    return successResponse(req, res, data, successResponses.DATA_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };

    const user = await UsersModel.findOne({ email: param.email }).lean();
    if (!user) return errorResponse(req, res, errorResponses.INVALID_UNAME_PWORD, 400);

    const hashedPassword = crypto
      .createHash('md5')
      .update(param.password || '')
      .digest('hex');

    const output = hashedPassword === user.password;
    if (!output) return errorResponse(req, res, errorResponses.INVALID_UNAME_PWORD, 401);

    const encryptedToken = encrypt(generateJWTtoken({ _id: user._id, role: user.role }));

    const data = {
      user,
      encryptedToken,
    };

    return successResponse(req, res, data, successResponses.DATA_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.profile = async (req, res) => {
  try {
    const data = await UsersModel.findOne({ _id: req.user._id });
    return successResponse(req, res, data, successResponses.DATA_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const data = await UsersModel.find({ });
    return successResponse(req, res, data, successResponses.DATA_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.findById = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };

    const data = await UsersModel.findOne({ _id: param.userId });
    return successResponse(req, res, data, successResponses.DATA_FETCHED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

exports.deleteById = async (req, res) => {
  try {
    const param = { ...req.body, ...req.params, ...req.query };

    const data = await UsersModel.deleteOne({ _id: param.userId });
    return successResponse(req, res, data, successResponses.DATA_DELETED);
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
