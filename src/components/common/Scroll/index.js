import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  useMemo
} from "react";
import PropTypes from "prop-types";
import BScroll from "@better-scroll/core";
import { ScrollContainer, PullUpLoading, PullDownLoading } from "./style";
import Loading from "../loading";
import LoadingV2 from "../loading-v2";
import { debounce } from "../../../api/utils";

// 滚动组件
const Scroll = forwardRef((props, ref) => {
  // better-scroll 实例对象
  const [bScroll, setBScroll] = useState();
  // current 指向初始化 bs 实例需要的 DOM 元素
  const scrollContainerRef = useRef();
  const {
    direction,
    click,
    refresh,
    bounceTop,
    bounceBottom,
    pullUpLoading,
    pullDownLoading
  } = props;
  const { pullUp, pullDown, onScroll } = props;

  let pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300);
  }, [pullUp]);

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300);
  }, [pullDown]);

  // 创建 bs 实例
  useEffect(() => {
    const scroll = new BScroll(scrollContainerRef.current, {
      scrollX: direction === "horizental", // 是否开启横向滚动
      scrollY: direction === "vertical", // 是否开启竖向滚动
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom
      }
    });
    setBScroll(scroll);
    return () => {
      setBScroll(null);
    };
    //eslint-disable-next-line
  }, []);

  // 每次重新渲染都要刷新实例，防止无法滑动
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  // 给实例绑定 scroll 事件
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on("scroll", scroll => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off("scroll");
    };
  }, [bScroll, onScroll]);

  // 进行上拉到底的判断，调用上拉刷新函数
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    let handleUp = () => {
      // 判断是否滑动到了底部
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    };
    bScroll.on("scrollEnd", handleUp);
    return () => {
      bScroll.off("scrollEnd", handleUp);
    };
  }, [pullUp, bScroll, pullUpDebounce]);

  // 下拉判断，调用下拉刷新函数
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    let handlePullDown = pos => {
      // 判断用户的下拉动作
      if (pos.y > 50) {
        pullDownDebounce();
      }
    };
    bScroll.on("touchEnd", handlePullDown);
    return () => {
      bScroll.off("touchEnd", handlePullDown);
    };
  }, [pullDown, bScroll, pullDownDebounce]);

  // 对父组件暴露的方法
  useImperativeHandle(ref, () => ({
    // refresh方法
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    // 获取 bs 实例
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  const pullUpdisplayStyle = pullUpLoading
    ? { display: "" }
    : { display: "none" };

  const pullDowndisplayStyle = pullDownLoading
    ? { display: "" }
    : { display: "none" };

  return (
    <ScrollContainer ref={scrollContainerRef}>
      {props.children}
      {/* 顶部下拉刷新动画 */}
      <PullDownLoading style={pullDowndisplayStyle}>
        <LoadingV2></LoadingV2>
      </PullDownLoading>
      {/* 滑到底部加载动画 */}
      <PullUpLoading style={pullUpdisplayStyle}>
        <Loading></Loading>
      </PullUpLoading>
    </ScrollContainer>
  );
});

Scroll.propTypes = {
  direction: PropTypes.oneOf(["vertical", "horizental"]), // 滚动方向
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool // 是否支持向下吸底
};

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

export default Scroll;
