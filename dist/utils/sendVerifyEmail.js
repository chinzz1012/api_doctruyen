"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    secure: false,
    auth: {
        user: process.env.EMAIL_VALIDATE_ACCOUNT || "kienn6181@gmail.com",
        pass: process.env.EMAIL_VALIDATE_PASSWORD || "pruaxgkkcsmpbrpa",
    },
});
transporter.verify((error, success) => {
    if (error) {
        console.log({ error });
    }
    else {
        console.log({ success });
    }
});
const sendVerificationEmail = async (email, uniqueString) => {
    const currentUrl = "https://api-comics.onrender.com";
    const mailOption = {
        from: process.env.EMAIL_VALIDATE_ACCOUNT || "kienn6181@gmail.com",
        to: email,
        subject: "Thư xác minh email",
        html: `<div style="display: flex; margin: 0 auto; justify-content: center; align-items: center; height: 100vh; font-family: Arial, Helvetica, sans-serif; box-sizing: border-box;">
    <div style="width: 600px; padding: 20px 8%; text-align: center; background-color: #fff; border-radius: 12px; color: #333;">
        <p style="font-size: 18px; color: #888;">Cảm ơn bạn đã đăng ký</p>
        <img src="https://i.pinimg.com/originals/ff/d2/c2/ffd2c238fb713dbf7872626b493f2a81.jpg" alt="email" width="300px">
        <h1>Xác minh địa chỉ email của bạn</h1>
        <p><p>Xác minh địa chỉ email của bạn để hoàn tất đăng ký và đăng nhập tài khoản của bạn.</p><p>Liên kết <b>có hiệu lực trong 60 phút</b>.</p><p>Nhấn vào <a href=${currentUrl + "/user/verify/" + email + "/" + uniqueString}> đây</a> để tiếp tục</p>
    </div>
</div>`,
    };
    await transporter.sendMail(mailOption);
};
exports.sendVerificationEmail = sendVerificationEmail;
//# sourceMappingURL=sendVerifyEmail.js.map