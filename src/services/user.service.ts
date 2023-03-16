import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model";
import user from "../types/user";
import response from "../types/response";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TIME = 1800; // 30m
const REFRESH_TIME = 864000; // 10 day

const createUserService = async (newUser: user): Promise<response> => {
  if (newUser.username.includes(" ") === true) {
    return {
      statusCode: "400",
      message: "Tên đăng nhập không được chứ khoảng trắng",
    };
  }
  const foundUser: user | null = await userModel.findOne({
    $or: [{ email: newUser.email }, { username: newUser.username }],
  });
  if (foundUser?.verified === true) {
    return { statusCode: "400", message: "Tài khoản đã tồn tại" };
  }
  if (
    foundUser?.verified === false &&
    foundUser.email !== newUser.email &&
    foundUser.username === newUser.username
  ) {
    return { statusCode: "400", message: "Tên tài khoản đã tồn tại" };
  }
  if (foundUser?.verified === false && foundUser.email === newUser.email) {
    await userModel.deleteOne({
      email: foundUser.email,
    });
  }
  newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
  await userModel.create(newUser);
  return { statusCode: "200", message: "Tạo tài khoản thành công" };
};

const getUserService = async (username: string, email: string) => {
  const foundUser: user | null = await userModel
    .findOne({
      $or: [{ email: email }, { username: username }],
      lock: false,
      verified: true,
    })
    .select("-_id -__v -password");
  return {
    statusCode: "200",
    message: "lấy người dùng thành công",
    data: foundUser,
  };
};

const getToken = (
  username: string,
  role: string | undefined,
  type: string
): string => {
  let key = process.env.JWT_SECRET || "";
  const payload = {
    username: username,
    rule: role || "",
  };
  if (type === "accessToken") {
    const accessToken = jwt.sign(payload, key, {
      expiresIn: ACCESS_TIME,
    });
    return accessToken;
  }
  //refreshToken
  const refreshToken = jwt.sign(payload, key, {
    expiresIn: REFRESH_TIME,
  });
  return refreshToken;
};

const loginByTokenService = async (token: string): Promise<any> => {
  let key = process.env.JWT_SECRET || "";
  try {
    const decoded: any = jwt.verify(token, key);
    const foundUser: user | null = await userModel
      .findOne({
        username: decoded?.username,
        verified: true,
        locked: false,
      })
      .select("-_id -__v -password -verified -locked -createdAt -updatedAt");
    if (foundUser?.refreshToken !== token) {
      return { statusCode: "401", message: "refresh token không đúng" };
    }
    const accessToken = getToken(
      foundUser.username,
      foundUser?.role,
      "accessToken"
    );
    const newUser: any = foundUser;
    return {
      statusCode: "200",
      message: "Đăng nhập thành công ",
      data: { ...newUser._doc, accessToken },
    };
  } catch (error) {
    return { statusCode: "402", message: "token đã hết hạn" };
  }
};

const loginService = async (
  id: string,
  password: string
): Promise<response> => {
  let foundUser: user | null = await userModel
    .findOne({
      $or: [{ email: id }, { username: id }],
      verified: true,
      locked: false,
    })
    .select("-_id -__v -verified -locked -createdAt -updatedAt");

  if (!foundUser) {
    return { statusCode: "400", message: "không tìm thấy tài khoản" };
  }
  const checkPass = bcrypt.compareSync(password, foundUser.password);
  if (checkPass === false) {
    return { statusCode: "400", message: "mật khẩu không đúng" };
  }

  let refreshToken = "";
  let key = process.env.JWT_SECRET || "";
  if (!foundUser.refreshToken) {
    refreshToken = getToken(
      foundUser.username,
      foundUser?.role,
      "refreshToken"
    );
    await userModel.updateOne(
      { username: foundUser.username },
      { refreshToken: refreshToken }
    );
  }
  if (foundUser?.refreshToken) {
    try {
      jwt.verify(foundUser?.refreshToken, key);
      refreshToken = foundUser?.refreshToken;
    } catch (error) {
      refreshToken = getToken(
        foundUser.username,
        foundUser?.role,
        "refreshToken"
      );
      await userModel.updateOne(
        { username: foundUser.username },
        { refreshToken: refreshToken }
      );
    }
  }
  const accessToken = getToken(
    foundUser.username,
    foundUser?.role,
    "accessToken"
  );
  foundUser.password = "";
  const newUser: any = foundUser;
  return {
    statusCode: "200",
    message: "Đăng nhập thành công",
    data: { ...newUser?._doc, accessToken, refreshToken },
  };
};

const verifyUserService = async (email: string) => {
  await userModel.updateOne(
    {
      email: email,
    },
    { verified: true }
  );
};

export {
  createUserService,
  getUserService,
  loginService,
  loginByTokenService,
  verifyUserService,
};
