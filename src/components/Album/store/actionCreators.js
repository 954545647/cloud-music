import { CHANGE_CURRENT_ALBUM, CHANGE_ENTER_LOADING } from "./constants";
import { getAlbumDetailReq } from "../../../api/request";
import { fromJS } from "immutable";

export const changeCurrentAlbum = data => ({
  type: CHANGE_CURRENT_ALBUM,
  data: fromJS(data)
});

export const changeLoading = data => ({
  type: CHANGE_ENTER_LOADING,
  data
});

export const getAlbumList = id => {
  return dispatch => {
    getAlbumDetailReq(id)
      .then(res => {
        let data = res.playlist;
        dispatch(changeCurrentAlbum(data));
        dispatch(changeLoading(false));
      })
      .catch(() => {
        console.log("获取 album 数据失败");
      });
  };
};
