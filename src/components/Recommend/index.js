import React, { useEffect } from "react";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";
import { forceCheck } from "react-lazyload";
import Scroll from "../common/scroll";
import Slider from "../common/slider";
import RecommendList from "../common/list";
import Loading from "../common/loading";
import { Content } from "./style";
import * as actionTypes from "./store/actionCreators";
function Recommend(props) {
  const { bannerList, recommendList, enterLoading, route } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    if (!bannerList.size) {
      getBannerDataDispatch();
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch();
    }
    //eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content className="scroll">
      <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS} />
          <RecommendList recommendList={recommendListJS} />
        </div>
      </Scroll>
      {enterLoading ? <Loading /> : null}
      {renderRoutes(route.routes)}
    </Content>
  );
}

// 映射 Redux 全局的 state 到组件的 props上
const mapStateToProps = state => ({
  // 不要在这里将数据 toJS
  // 不然每次 diff 比对 props 的时候都是不一样的引用，还是导致不必要的重渲染，属于滥用 immutable
  bannerList: state.getIn(["recommend", "bannerList"]),
  recommendList: state.getIn(["recommend", "recommendList"]),
  enterLoading: state.getIn(["recommend", "enterLoading"])
});

// 映射 dispatch 到 props 上
const mapDispatchToProps = dispatch => {
  return {
    getBannerDataDispatch: () => {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch: () => {
      dispatch(actionTypes.getRecommendList());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Recommend));
