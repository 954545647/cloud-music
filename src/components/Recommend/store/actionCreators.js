import * as actionTypes from "./constants";
import { fromJS } from "immutable";
import { getBannerReq, getRecommendListReq } from "../../../api/request";

export const changeBannerList = data => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
});

export const changeRecommendList = data => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
});

// 改变首页loading状态
export const changeEnterLoading = data => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
});

export const getBannerList = () => {
  return dispatch => {
    getBannerReq()
      .then(data => dispatch(changeBannerList(data.banners)))
      .catch(() => {
        console.log("轮播图数据传输错误");
      });
  };
};

export const getRecommendList = () => {
  return dispatch => {
    getRecommendListReq()
      .then(data => {
        // 改变redux中数据
        dispatch(changeRecommendList(data.result));
        // 改变loading状态
        dispatch(changeEnterLoading(false));
      })
      .catch(() => {
        console.log("推荐歌单数据传输错误");
      });
  };
};
