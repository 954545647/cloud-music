import React from "react";
import { withRouter } from "react-router";
import { ListWrapper, List, ListItem } from "./style";
import { getCount } from "../../../api/utils";
import LazyLoad from "react-lazyload";
function RecommendList(props) {
  const { recommendList } = props;

  const enterDetail = id => {
    props.history.push(`/recommend/${id}`);
  };
  return (
    <ListWrapper>
      <h2 className="title">推荐歌单</h2>
      <List>
        {recommendList.map((item, index) => {
          return (
            <ListItem
              key={item.id + index}
              onClick={() => enterDetail(item.id)}
            >
              <div className="img_wrapper">
                <div className="decorate"></div>
                <LazyLoad>
                  <img
                    src={item.picUrl + "?param=300x300"}
                    width="100%"
                    height="100%"
                    alt="music"
                  ></img>
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{item.name}</div>
            </ListItem>
          );
        })}
      </List>
    </ListWrapper>
  );
}

export default React.memo(withRouter(RecommendList));
