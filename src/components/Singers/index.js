import React, { useEffect, useContext } from "react";
import Horizen from "../common/horizen-item";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import LazyLoad, { forceCheck } from "react-lazyload";
import { categoryTypes, alphaTypes } from "../../api/config";
import { Content, List, ListItem, ListContainer } from "./style";
import Scroll from "../common/scroll";
import Loading from "../common/loading";
import { CategoryDataContext, CHANGE_CATEGORY, CHANGE_ALPHA } from "./data";
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMoreSingerList,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from "./store/actionCreators";

function Singers(props) {
  // let [category, setCategory] = useState("");
  // let [alpha, setAlpha] = useState("");
  // 从 Provider 中获取值
  let { data, dispatch } = useContext(CategoryDataContext);
  const { category, alpha } = data.toJS();
  const {
    singerList,
    pageCount,
    enterLoading,
    pullUpLoading,
    pullDownLoading
  } = props;
  const {
    updateDispatch,
    getHotSingerDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch
  } = props;

  const enterDetail = id => {
    props.history.push(`/singers/${id}`);
  };

  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch();
    }
    //eslint-disable-next-line
  }, []);

  let handleUpdateAlpha = val => {
    // setAlpha(val);
    dispatch({
      type: CHANGE_ALPHA,
      data: val
    });
    updateDispatch(category, val);
  };

  let handleUpdateCatetory = val => {
    // setCategory(val);
    dispatch({
      type: CHANGE_CATEGORY,
      data: val
    });
    updateDispatch(val, alpha);
  };

  const singerListJS = singerList ? singerList.toJS() : [];

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === "", pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };
  console.log(props.route);

  const renderSingerList = data => {
    return (
      <List>
        {data.map((item, index) => {
          return (
            <ListItem
              key={item.accountId + "" + index}
              onClick={() => {
                enterDetail(item.id);
              }}
            >
              <div className="img_wrapper">
                <LazyLoad>
                  <img
                    src={`${item.picUrl}?param=300x300`}
                    alt="歌手封面"
                    width="100%"
                    height="100%"
                  ></img>
                </LazyLoad>
              </div>
              <span className="name">{item.name}</span>
            </ListItem>
          );
        })}
      </List>
    );
  };

  return (
    <div>
      <Content>
        <Horizen
          list={categoryTypes}
          title={"分类"}
          handleClick={handleUpdateCatetory}
          oldVal={category}
        ></Horizen>
        <Horizen
          list={alphaTypes}
          title={"首字母"}
          handleClick={handleUpdateAlpha}
          oldVal={alpha}
        ></Horizen>
      </Content>
      <ListContainer>
        <Scroll
          pullUp={handlePullUp}
          pullDown={handlePullDown}
          pullUpLoading={pullUpLoading}
          pullDownLoading={pullDownLoading}
          onScroll={forceCheck}
        >
          {renderSingerList(singerListJS)}
        </Scroll>
      </ListContainer>
      {/* 入场加载动画 */}
      {enterLoading ? <Loading /> : null}
      {renderRoutes(props.route.routes)}
    </div>
  );
}

const mapStateToProps = state => ({
  singerList: state.getIn(["singers", "singerList"]),
  enterLoading: state.getIn(["singers", "enterLoading"]),
  pullUpLoading: state.getIn(["singers", "pullUpLoading"]),
  pullDownLoading: state.getIn(["singers", "pullDownLoading"]),
  pageCount: state.getIn(["singers", "pageCount"])
});

const mapDispatchToProps = dispatch => {
  return {
    getHotSingerDispatch() {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0)); //由于改变了分类，所以pageCount清零
      dispatch(changeEnterLoading(true)); //loading，现在实现控制逻辑，效果实现放到下一节，后面的loading同理
      dispatch(getSingerList(category, alpha));
    },
    // 滑到最底部刷新部分的处理
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullUpLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMoreHotSingerList());
      } else {
        dispatch(refreshMoreSingerList(category, alpha));
      }
    },
    //顶部下拉刷新
    pullDownRefreshDispatch(category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0)); //属于重新获取数据
      if (category === "" && alpha === "") {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singers));
