import { getSingerInfoReq } from "../../../api/request";

import {
  CHANGE_ARTIST,
  CHANGE_SONGS_OF_ARTIST,
  CHANGE_ENTER_LOADING
} from "./constants";

import { fromJS } from "immutable";

export const changeArtist = data => ({
  type: CHANGE_ARTIST,
  data: fromJS(data)
});

export const changeSongs = data => ({
  type: CHANGE_SONGS_OF_ARTIST,
  data: fromJS(data)
});

//进场loading
export const changeEnterLoading = data => ({
  type: CHANGE_ENTER_LOADING,
  data
});

export const getSingerInfo = id => {
  return dispatch => {
    getSingerInfoReq(id)
      .then(res => {
        let { artist, hotSongs } = res;
        dispatch(changeArtist(artist));
        dispatch(changeSongs(hotSongs));
        dispatch(changeEnterLoading(false));
      })
      .catch(() => {
        console.log("歌手详情数据获取失败");
      });
  };
};
