import categoryModel from "../models/category.model";
import category from "../types/category";
import response from "../types/response";

const createCategoryService = async (
  newCategory: category
): Promise<response> => {
  const foundCategory = await categoryModel.findOne({ name: newCategory.name });
  if (foundCategory) {
    return { statusCode: "400", message: "Danh mục đã tồn tại" };
  }
  await categoryModel.create(newCategory);
  return { statusCode: "200", message: "tạo danh mục thành công" };
};

const getAllCategoryService = async (): Promise<response> => {
  const allCategory: category[] = await categoryModel
    .find({})
    .select("-_id -__v -createdAt -updatedAt")
    .sort({ name: 1 });
  return {
    statusCode: "200",
    message: "Lấy danh mục thành công",
    data: allCategory,
  };
};

export { createCategoryService, getAllCategoryService };
