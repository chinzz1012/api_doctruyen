import storyModel from "../models/story.model";
import response from "../types/response";
import story from "../types/story";
import { getAllCategoryService } from "./category.service";

const perPage = 10;

const getAllStoryService = async (page: number): Promise<response> => {
  if (page === 0) {
    const allStory: story[] = await storyModel
      .find({})
      .select("-_id -__v -describe -finished")
      .sort({ viewCount: -1, updatedAt: 1 });
    return {
      statusCode: "200",
      message: "lấy truyện thành công",
      data: allStory,
    };
  }
  const foundStory: story[] = await storyModel
    .find({})
    .select("-_id -__v -describe -finished")
    .sort({ viewCount: -1, updatedAt: -1 })
    .skip(perPage * page - perPage)
    .limit(perPage);
  return {
    statusCode: "200",
    message: "Lấy truyện thành công",
    data: foundStory,
  };
};

const getStoryByCategoryService = async (
  category: string
): Promise<response> => {
  const foundStory: story[] = await storyModel
    .find({ category: { $regex: category, $options: "i" } })
    .select("-_id -__v -describe -finished")
    .sort({ viewCount: -1, updatedAt: 1 });
  return {
    statusCode: "200",
    message: "Lấy truyện thành công",
    data: foundStory,
  };
};

const getStoryByNameService = async (name: string): Promise<response> => {
  const foundStory: story | null = await storyModel
    .findOne({ name: name })
    .select("-_id -__v");
  return {
    statusCode: "200",
    message: "Lấy truyện thành công",
    data: foundStory,
  };
};

const createStoryService = async (newStory: story): Promise<response> => {
  const foundStory: story = (await getStoryByNameService(newStory.name)).data;
  if (foundStory) {
    return { statusCode: "400", message: "Truyện đã tồn tại" };
  }
  const allCategory: string = (await getAllCategoryService()).data.toString();
  let check: string | undefined = newStory.category.find(
    (cate) => allCategory.includes(cate) === false
  );
  if (check) {
    return { statusCode: "400", message: "Danh mục không tồn tại" };
  }
  await storyModel.create(newStory);
  return { statusCode: "200", message: "Tạo truyện thành công" };
};

const updateStoryService = async (newStory: story): Promise<response> => {
  const foundStory: story | null = (await getStoryByNameService(newStory.name))
    .data;
  if (!foundStory) {
    return { statusCode: "400", message: "Truyện không tồn tại" };
  }
  await storyModel.updateOne(
    { name: foundStory.name },
    {
      creator: newStory.creator || foundStory.creator,
      describe: newStory.describe || foundStory.describe,
      finished: newStory.finished || foundStory.finished,
      category: newStory.category || foundStory.category,
    }
  );
  return { statusCode: "200", message: "Tạo truyện thành công" };
};

const updateViewCountService = async (name: string): Promise<response> => {
  const foundStory: story | null = (await getStoryByNameService(name)).data;
  if (!foundStory) {
    return { statusCode: "400", message: "Truyện không tồn tại" };
  }
  await storyModel.updateOne(
    { name: foundStory.name },
    {
      viewCount: ++foundStory.viewCount,
    }
  );
  return { statusCode: "200", message: "Tạo truyện thành công" };
};

const updateLikeCountService = async (
  name: string,
  value: number
): Promise<response> => {
  const foundStory: story | null = (await getStoryByNameService(name)).data;
  if (!foundStory) {
    return { statusCode: "400", message: "Truyện không tồn tại" };
  }
  await storyModel.updateOne(
    { name: foundStory.name },
    {
      likeCount: foundStory.likeCount + value,
    }
  );
  return { statusCode: "200", message: "Tạo truyện thành công" };
};

export {
  getAllStoryService,
  getStoryByCategoryService,
  getStoryByNameService,
  createStoryService,
  updateStoryService,
  updateViewCountService,
  updateLikeCountService,
};
