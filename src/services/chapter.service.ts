import chapterModel from "../models/chapter.model";
import chapter from "../types/chapter";
import response from "../types/response";

const createChapterService = async (newChapter: chapter): Promise<response> => {
  const foundChapter: chapter | null = (
    await getChapterService(newChapter.storyName, newChapter.chapterNumber)
  ).data;
  if (foundChapter) {
    return { statusCode: "400", message: "Chapter đã tồn tại" };
  }
  await chapterModel.create(newChapter);
  return { statusCode: "200", message: "tạo chapter thành công" };
};

const getChapterService = async (
  storyName: string,
  chapterNumber: number
): Promise<response> => {
  const foundChapter: chapter | null = await chapterModel.findOne({
    storyName: storyName,
    chapterNumber: chapterNumber,
  });
  return {
    statusCode: "200",
    message: "Lấy chapter thành công",
    data: foundChapter,
  };
};

const getChapterInStoryService = async (
  storyName: string
): Promise<response> => {
  const foundChapter: chapter[] = await chapterModel
    .find({
      storyName: storyName,
    })
    .select("-_id -__v -updatedAt -url")
    .sort({ chapterNumber: 1 });
  return {
    statusCode: "200",
    message: "Lấy chapter thành công",
    data: foundChapter,
  };
};

const updateViewCountChapterService = async (
  storyName: string,
  chapterNumber: number
): Promise<response> => {
  const foundChapter: chapter | null = (
    await getChapterService(storyName, chapterNumber)
  ).data;
  if (!foundChapter) {
    return { statusCode: "400", message: "Chapter không tồn tại" };
  }
  await chapterModel.updateOne(
    { storyName: storyName, chapterNumber: chapterNumber },
    {
      viewCount: ++foundChapter.viewCount,
    }
  );
  return { statusCode: "200", message: "update view chapter thành công" };
};

export {
  createChapterService,
  getChapterService,
  getChapterInStoryService,
  updateViewCountChapterService,
};
