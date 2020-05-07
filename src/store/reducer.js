import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../components/Recommend/store";
import { reducer as singersReducer } from "../components/Singers/store";
import { reducer as rankReducer } from "../components/Rank/store";
import { reducer as albumReducer } from "../components/Album/store";
import { reducer as singerInfoReducer } from "../components/Singer/store";
export default combineReducers({
  // 之后开发具体功能模块的时候添加 reducer
  recommend: recommendReducer,
  singers: singersReducer,
  rank: rankReducer,
  album: albumReducer,
  singerInfo: singerInfoReducer
});
