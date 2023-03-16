import historyModel from "../models/history.model";
import history from "../types/history";
import story from "../types/story";
import response from "../types/response";
import {
  updateViewCountService,
  updateLikeCountService,
} from "./story.service";
import { updateViewCountChapterService } from "./chapter.service";
import { getStoryByNameService } from "./story.service";

const createHistoryService = async (newHistory: history): Promise<response> => {
  const foundStory: story | null = (
    await getStoryByNameService(newHistory.storyName)
  ).data;
  if (!foundStory) {
    return { statusCode: "400", message: "Truyện không tồn tại" };
  }
  newHistory.avatarStory = foundStory?.avatar;
  let foundHistory: history | null = await historyModel.findOne({
    username: newHistory.username,
    storyName: newHistory.storyName,
  });
  if (foundHistory) {
    let res: response = await updateViewCountService(newHistory.storyName);
    if (res.statusCode !== "200") {
      return res;
    }
    res = await updateViewCountChapterService(
      newHistory.storyName,
      newHistory?.currentChapter || -1
    );
    if (res.statusCode !== "200") {
      return res;
    }
    await historyModel.updateOne(
      { userName: newHistory.username, storyName: newHistory.storyName },
      {
        currentChapter: newHistory.currentChapter,
        avatarStory: newHistory.avatarStory,
      }
    );
    return { statusCode: "200", message: "Cập nhật lịch sử thành công" };
  }
  let res: response = await updateViewCountService(newHistory.storyName);
  if (res.statusCode !== "200") {
    return res;
  }
  res = await updateViewCountChapterService(
    newHistory.storyName,
    newHistory?.currentChapter || -1
  );
  if (res.statusCode !== "200") {
    return res;
  }
  await historyModel.create(newHistory);
  return { statusCode: "200", message: "Thêm lịch sử thành công" };
};

const likeHistoryService = async (newHistory: history): Promise<response> => {
  let foundHistory: history | null = await historyModel.findOne({
    username: newHistory.username,
    storyName: newHistory.storyName,
  });
  if (foundHistory) {
    if (foundHistory.liked === newHistory.liked) {
      return { statusCode: "200", message: "Không có gì cần cập nhật" };
    }
    let value = newHistory?.liked === true ? 1 : -1;
    const res: response = await updateLikeCountService(
      newHistory.storyName,
      value
    );
    if (res.statusCode !== "200") {
      return res;
    }
    await historyModel.updateOne(
      { userName: newHistory.username, storyName: newHistory.storyName },
      { liked: newHistory.liked }
    );
    return { statusCode: "200", message: "Cập nhật thành công" };
  }
  if (newHistory?.liked === false) {
    return { statusCode: "400", message: "Không thể hủy like" };
  }
  const res: response = await updateLikeCountService(newHistory.storyName, 1);
  if (res.statusCode !== "200") {
    return res;
  }
  await historyModel.create(newHistory);
  return { statusCode: "200", message: "Like thành công" };
};

const getHistoryService = async (history: Object): Promise<response> => {
  const foundHistory: history[] = await historyModel
    .find(history)
    .select("-_id -__v -createdAt")
    .sort({ updatedAt: -1 });
  return {
    statusCode: "200",
    message: "Lấy dữ liệu thành công",
    data: foundHistory,
  };
};

const deleteHistoryService = async (
  username: string,
  storyName: string
): Promise<response> => {
  await historyModel.findOneAndUpdate(
    { username, storyName },
    { currentChapter: 0 }
  );
  return {
    statusCode: "200",
    message: "Xóa lịch sử thành công",
  };
};

export {
  createHistoryService,
  likeHistoryService,
  getHistoryService,
  deleteHistoryService,
};
