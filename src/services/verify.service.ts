import verifyModel from "../models/verify.model";
import verify from "../types/verify";
import response from "../types/response";

const EFFECTIVE_SECONDS = 3600; // 60m

const createVerifyService = async (newVerify: verify): Promise<response> => {
  newVerify.effectiveSeconds = EFFECTIVE_SECONDS;
  await verifyModel.create(newVerify);
  return { statusCode: "200", message: "tạo mã xác thực thành công" };
};

const getVerifyService = async (
  email: string,
  uniqueString: string
): Promise<response> => {
  const foundVerify: verify | null = await verifyModel.findOne({
    email: email,
    uniqueString: uniqueString,
  });
  return {
    statusCode: "200",
    message: "lấy mã xác thực thành công",
    data: foundVerify,
  };
};

const deleteVerifyService = async (email: string) => {
  await verifyModel.deleteMany({
    email: email,
  });
};

export { createVerifyService, deleteVerifyService, getVerifyService };
