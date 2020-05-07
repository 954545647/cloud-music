import axiosIns from "./axios";

// 请求轮播图
export const getBannerReq = () => {
  return axiosIns.get("./banner");
};

// 请求首页推荐数据
export const getRecommendListReq = () => {
  return axiosIns.get("/personalized");
};

// 歌手请求
export const getHotSingerListReq = count => {
  return axiosIns.get(`/top/artists?offset=${count}`);
};

export const getSingerListReq = (category, alpha, count) => {
  return axiosIns.get(
    `/artist/list?cat=${category}&initial=${alpha.toLowerCase()}&offset=${count}`
  );
};

// 排行榜
export const getRankListReq = () => {
  return axiosIns.get("./toplist/detail");
};

export const getAlbumDetailReq = id => {
  return axiosIns.get(`/playlist/detail?id=${id}`);
};

// 歌手详情
export const getSingerInfoReq = id => {
  return axiosIns.get(`/artists?id=${id}`);
};
