import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken: any = req.headers.access_token;
    const username = req.body?.username;
    if (!accessToken) {
      res
        .status(200)
        .json({ statusCode: "411", message: "Không tìm thấy token" });
      return;
    }
    let key = process.env.JWT_SECRET || "";
    const decoded: any = jwt.verify(accessToken, key);
    if (decoded?.username !== username) {
      res.status(200).json({
        statusCode: "412",
        message: "username không đúng",
      });
      return;
    }
    next();
  } catch (error) {
    res.status(200).json({ statusCode: "410", message: `${error}` });
  }
};

const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken: any = req.headers.access_token;
    if (!accessToken) {
      res
        .status(200)
        .json({ statusCode: "411", message: "Không tìm thấy token" });
      return;
    }
    let key = process.env.JWT_SECRET || "";
    const decoded: any = jwt.verify(accessToken, key);
    if (decoded?.rule !== "admin") {
      res.status(200).json({
        statusCode: "412",
        message: "Người dùng không có quyền thay đổi dữ liệu này",
      });
      return;
    }
    next();
  } catch (error) {
    res.status(200).json({ statusCode: "410", message: `${error}` });
  }
};

export { authUser, authAdmin };
