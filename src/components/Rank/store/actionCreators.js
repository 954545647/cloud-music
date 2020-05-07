import { CHANGE_RANK_LIST, CHANGE_LOADING } from "./constants";
import { fromJS } from "immutable";
import { getRankListReq } from "../../../api/request";

// 改变排行榜数据
export const changeRankList = data => ({
  type: CHANGE_RANK_LIST,
  data: fromJS(data)
});

// 改变loading状态
export const changeLoading = data => ({
  type: CHANGE_LOADING,
  data
});

export const getRankList = () => {
  return dispatch => {
    getRankListReq().then(data => {
      let list = data && data.list;
      dispatch(changeRankList(list));
      dispatch(changeLoading(false));
    });
  };
};
