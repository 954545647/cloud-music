import React, { useState, useRef, useEffect, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import Header from "../common/header";
import Scroll from "../common/scroll";
import { TopDesc, Menu, SongList, SongItem, Container } from "./style";
import { getCount, getName, isEmptyObject } from "../../api/utils";
import style from "../../assets/global-style";
import { getAlbumList, changeLoading } from "./store/actionCreators";
import Loading from "../common/loading";
export const HEADER_HEIGHT = 45;

function Album(props) {
  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState("歌单");
  const [isMarquee, setIsMarquee] = useState(false); // 是否跑马灯
  const headerEl = useRef();
  const { currentAlbum: currentAlbumData, loading } = props;
  const { getAlbumDataDispatch } = props;
  const id = props.match.params.id;

  useEffect(() => {
    getAlbumDataDispatch(id);
  }, [getAlbumDataDispatch, id]);

  const handleBack = useCallback(() => {
    // props.history.goBack();  // 这种写法会没有动画效果
    setShowStatus(false);
  }, []);

  let currentAlbum = currentAlbumData ? currentAlbumData.toJS() : {};

  const handleScroll = useCallback(
    pos => {
      let minScrollY = -HEADER_HEIGHT;
      let percent = Math.abs(pos.y / minScrollY);
      let headerDom = headerEl.current;
      if (pos.y < minScrollY) {
        headerDom.style.backgroundColor = style["theme-color"];
        headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
        setTitle(currentAlbum.name);
        setIsMarquee(true);
      } else {
        headerDom.style.background = "";
        headerDom.style.opacity = 1;
        setTitle("歌单");
        setIsMarquee(false);
      }
    },
    [currentAlbum]
  );

  // 渲染歌单封面
  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="封面" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">
              {Math.floor(currentAlbum.subscribedCount / 1000) / 10}万
            </span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="作者" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };

  const renderSongList = () => {
    return (
      <SongList>
        <div className="first_line">
          <div className="play_all">
            <i className="iconfont">&#xe6e3;</i>
            <span>
              播放全部
              <span className="sum">(共{currentAlbum.tracks.length}首)</span>
            </span>
          </div>
          <div className="add_list">
            <i className="iconfont">&#xe62d;</i>
            <span>收藏({getCount(currentAlbum.subscribedCount)})</span>
          </div>
        </div>
        <SongItem>
          {currentAlbum.tracks.map((item, index) => {
            return (
              <li key={index}>
                <span className="index">{index + 1}</span>
                <div className="info">
                  <span>{item.name}</span>
                  <span>
                    {getName(item.ar)} - {item.al.name}
                  </span>
                </div>
              </li>
            );
          })}
        </SongItem>
      </SongList>
    );
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear={true}
      unmountOnExit
      // 在退出动画执行结束时执行路由跳转
      onExited={props.history.goBack}
    >
      <Container>
        <Header
          title={title}
          handleClick={handleBack}
          ref={headerEl}
          isMarquee={isMarquee}
        ></Header>
        {loading ? (
          <Loading />
        ) : !isEmptyObject(currentAlbum) ? (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              {renderTopDesc()}
              {renderMenu()}
              {renderSongList()}
            </div>
          </Scroll>
        ) : null}
      </Container>
    </CSSTransition>
  );
}

const mapStateToProps = state => ({
  currentAlbum: state.getIn(["album", "currentAlbum"]),
  loading: state.getIn(["album", "loading"])
});

const mapDispatchToProps = dispatch => ({
  getAlbumDataDispatch(id) {
    dispatch(changeLoading(true));
    dispatch(getAlbumList(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Album));
