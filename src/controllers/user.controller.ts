import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import path from "path";
import response from "../types/response";
import user from "../types/user";
import verify from "../types/verify";
import {
  createUserService,
  loginService,
  loginByTokenService,
  getUserService,
  verifyUserService,
} from "../services/user.service";
import { sendVerificationEmail } from "../utils/sendVerifyEmail";
import {
  createVerifyService,
  deleteVerifyService,
  getVerifyService,
} from "../services/verify.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: user = req.body;
    const response: response = await createUserService(newUser);
    if (response.statusCode === "200") {
      const uniqueString = uuidV4();
      await sendVerificationEmail(newUser.email, uniqueString);
      const newVerify: any = {
        email: newUser.email,
        uniqueString: uniqueString,
      };
      await createVerifyService(newVerify);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id: any = req.query.id || "";
    const email: any = req.query.email || "";
    const response: response = await getUserService(id, email);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const password: string = req.body.password;
    const response: response = await loginService(id, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const loginByToken = async (req: Request, res: Response) => {
  try {
    const token: string = req.body.refreshToken;
    const response: response = await loginByTokenService(token);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const email: string = req.params.email;
    const uniqueString: string = req.params.uniqueString;
    const foundVerify: verify | null = (
      await getVerifyService(email, uniqueString)
    ).data;
    if (!foundVerify) {
      const message = "Tài khoản không tồn tại hoặc đã được xác minh";
      res.redirect(`/user/verified?error=true&message=${message}`);
      return;
    }
    if (
      foundVerify?.createdAt.getTime() + foundVerify.effectiveSeconds * 1000 <
      new Date().getTime()
    ) {
      const message = "Liên kết đã hết hạn, vui lòng đăng ký lại";
      res.redirect(`/user/verified?error=true&message=${message}`);
      return;
    }
    console.log("oke");
    await verifyUserService(email);
    await deleteVerifyService(email);
    res.redirect(`/user/verified`);
  } catch (error) {
    console.log(error);
    const message = "Đã xảy ra lỗi khi kiểm tra xác minh người dùng hiện tại";
    res.redirect(`/user/verified?error=true&message=${message}`);
  }
};

const verified = (_req: Request, res: Response) => {
  try {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "./../views/verified.html"));
  } catch (error) {
    console.log(error);
  }
};

export default {
  createUser,
  login,
  loginByToken,
  getUser,
  verifyEmail,
  verified,
};
