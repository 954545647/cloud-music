import React, { useState, useEffect, useRef, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import {
  Container,
  ImgWrapper,
  CollectButton,
  SongListWrapper,
  BgLayer
} from "./style";
import Scroll from "../common/scroll";
import Header from "../common/header";
import SongsList from "../common/songList";
import { HEADER_HEIGHT } from "../../api/config";
import { connect } from "react-redux";
import { getSingerInfo, changeEnterLoading } from "./store/actionCreators";
import Loading from "../common/loading";

// 往上偏移，漏出圆角
const OFFSET = 5;

function Singer(props) {
  const { artist: immutableArtist, songs: immutableSongs, loading } = props;
  const { getSingerDataDispatch } = props;
  const [showStatus, setShowStatus] = useState(true);
  const collectButton = useRef();
  const imageWrapper = useRef();
  const songListWrapper = useRef();
  const header = useRef();
  const songScroll = useRef();
  const layer = useRef();
  const initialHeight = useRef(0);

  const handleHeaderClick = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = pos => {
    let height = initialHeight.current;
    const newY = pos.y;
    const imageDOM = imageWrapper.current;
    const buttonDOM = collectButton.current;
    const headerDOM = header.current;
    const layerDOM = layer.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    // 滑动距离占图片高度的百分比
    const percent = Math.abs(newY / height);
    // 处理往下拉的情况： 图片放大，按钮跟着偏移
    if (newY > 0) {
      imageDOM.style["transform"] = `scale(${1 + percent})`;
      buttonDOM.style["transform"] = `translate3d(0,${newY}px,0)`;
      layerDOM.style.top = `${height - OFFSET + newY}px`;
    } else if (newY >= minScrollY) {
      // 往上滑动，但是遮罩还没超过Header部分
      layerDOM.style.top = `${height - OFFSET - Math.abs(newY)}px`;
      // 这时候保证遮罩层的层叠优先级比图片高，不至于被图片挡住
      layerDOM.style.zIndex = 1;
      imageDOM.style.height = 0;
      imageDOM.style.paddingTop = "75%";
      imageDOM.style.zIndex = -1;
      // 按钮跟着移动，并且逐渐隐藏
      buttonDOM.style["transform"] = `translate3d(0,${newY}px,0)`;
      buttonDOM.style["opacity"] = `${1 - percent * 2}`;
    } else if (newY < minScrollY) {
      // 往上滑动，遮罩超过Header部分
      layerDOM.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerDOM.style.zIndex = 1;
      // 防止溢出的歌单内容遮住Header
      headerDOM.style.zIndex = 100;
      // 此时图片高度与Header一致
      imageDOM.style.height = `${HEADER_HEIGHT}px`;
      imageDOM.style.paddingTop = 0;
      imageDOM.style.zIndex = 99;
    }
  };

  const artist = immutableArtist ? immutableArtist.toJS() : {};
  const songs = immutableSongs ? immutableSongs.toJS() : [];

  useEffect(() => {
    let h = imageWrapper.current.offsetHeight;
    songListWrapper.current.style.top = `${h - OFFSET}px`;
    initialHeight.current = h;
    // 遮罩层往下放，以裹住歌曲列表
    layer.current.style.top = `${h - OFFSET}px`;
    songScroll.current.refresh();
  }, []);

  useEffect(() => {
    const id = props.match.params.id;
    getSingerDataDispatch(id);
    // eslint-disable-next-line
  }, []);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      unmountOnExit
      appear={true}
      onExited={() => props.history.goBack()}
    >
      <Container>
        <Header
          title="歌单"
          handleClick={handleHeaderClick}
          ref={header}
        ></Header>
        {loading ? <Loading /> : null}
        <ImgWrapper bgUrl={artist.picUrl} ref={imageWrapper}>
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButton}>
          <i className="iconfont">&#xe62d;</i>
          <span className="collect">收藏</span>
        </CollectButton>
        {loading ? <Loading></Loading> : null}
        <BgLayer ref={layer} className="xxxxxxxxxxxxxx"></BgLayer>
        <SongListWrapper className="xxx" ref={songListWrapper}>
          <Scroll ref={songScroll} onScroll={handleScroll}>
            <SongsList songs={songs} showCollect={false}></SongsList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  );
}

const mapStateToProps = state => ({
  artist: state.getIn(["singerInfo", "artist"]),
  songs: state.getIn(["singerInfo", "songsOfArtist"]),
  loading: state.getIn(["singerInfo", "loading"])
});

const mapDispatchToProps = dispatch => ({
  getSingerDataDispatch(id) {
    dispatch(changeEnterLoading(true));
    dispatch(getSingerInfo(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Singer));
