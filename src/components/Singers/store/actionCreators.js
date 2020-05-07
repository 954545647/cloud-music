import { getHotSingerListReq, getSingerListReq } from "../../../api/request";

import {
  CHANGE_SINGER_LIST,
  // CHANGE_CATOGORY,
  // CHANGE_ALPHA,
  CHANGE_PAGE_COUNT,
  CHANGE_PULLUP_LOADING,
  CHANGE_PULLDOWN_LOADING,
  CHANGE_ENTER_LOADING
} from "./constants";
import { fromJS } from "immutable";

export const changeSingerList = data => ({
  type: CHANGE_SINGER_LIST,
  data: fromJS(data)
});
export const changePageCount = data => ({
  type: CHANGE_PAGE_COUNT,
  data
});

//进场loading
export const changeEnterLoading = data => ({
  type: CHANGE_ENTER_LOADING,
  data
});

//滑动最底部loading
export const changePullUpLoading = data => ({
  type: CHANGE_PULLUP_LOADING,
  data
});

//顶部下拉刷新loading
export const changePullDownLoading = data => ({
  type: CHANGE_PULLDOWN_LOADING,
  data
});

//第一次加载热门歌手
export const getHotSingerList = () => {
  return dispath => {
    getHotSingerListReq(0)
      .then(res => {
        const data = res.artists;
        dispath(changeSingerList(data));
        dispath(changeEnterLoading(false));
        dispath(changePullDownLoading(false));
      })
      .catch(() => console.log("热门歌手数据加载失败"));
  };
};

//加载更多热门歌手
export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(["singers", "pageCount"]);
    const singerList = getState()
      .getIn(["singers", "singerList"])
      .toJS();
    getHotSingerListReq(pageCount)
      .then(res => {
        const data = [...singerList, ...res.artists];
        dispatch(changeSingerList(data));
        dispatch(changePullUpLoading(false));
      })
      .catch(() => {
        console.log("热门歌手获取数据失败");
      });
  };
};

// 加载对应类型的歌手
export const getSingerList = (category, alpha) => {
  return dispatch => {
    getSingerListReq(category, alpha, 0)
      .then(res => {
        const data = res.artists;
        dispatch(changeSingerList(data));
        dispatch(changeEnterLoading(false));
        dispatch(changePullDownLoading(false));
      })
      .catch(() => {
        console.log("歌手数据加载失败");
      });
  };
};

// 加载更多歌手
export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(["singers", "pageCount"]);
    const singerList = getState();
    getSingerListReq(category, alpha, pageCount)
      .then(res => {
        const data = [...singerList, ...res.artists];
        dispatch(changeSingerList(data));
        dispatch(changePullUpLoading(false));
      })
      .catch(() => {
        console.log("歌手数据加载失败");
      });
  };
};
