import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getRankList } from "./store/actionCreators";
import { renderRoutes } from "react-router-config";
import { filterIndex } from "../../api/utils";
import { Container, List, ListItem, SongList } from "./style";
import Lazyload, { forceCheck } from "react-lazyload";
import Scroll from "../common/scroll";
import Loading from "../common/loading";
function Rank(props) {
  const { rankList: list, loading, route } = props;
  const { getRankListDataDispatch } = props;
  let rankList = list ? list.toJS() : [];
  let globalStartIndex = filterIndex(rankList);
  let officialList = rankList.slice(0, globalStartIndex);
  let globalList = rankList.slice(globalStartIndex);

  const enterDetail = detail => {
    props.history.push(`/rank/${detail.id}`);
  };

  useEffect(() => {
    if (!rankList.size) {
      getRankListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {list.map(item => {
          return (
            <ListItem
              key={item.coverImgId}
              tracks={item.tracks}
              onClick={() => enterDetail(item)}
            >
              <div className="img_wrapper">
                <Lazyload>
                  <img
                    src={`${item.coverImgUrl}?param=300x300`}
                    width="100%"
                    height="100%"
                    alt="排行图片"
                  ></img>
                </Lazyload>
                <div className="decorate"></div>
                <span className="update_frequency">{item.updateFrequency}</span>
              </div>
              {renderSongList(item.tracks)}
            </ListItem>
          );
        })}
      </List>
    );
  };

  const renderSongList = list => {
    return list.length ? (
      <SongList>
        {list.map((item, index) => {
          return (
            <li key={index}>
              {index + 1}. {item.first} - {item.second}
            </li>
          );
        })}
      </SongList>
    ) : null;
  };

  // 隐藏两个h1标题
  let displayStyle = loading ? { display: "none" } : { display: "" };

  return (
    <Container>
      <Scroll onScroll={forceCheck}>
        {loading ? <Loading /> : null}
        <div>
          <h1 className="offical" style={displayStyle}>
            官方榜
          </h1>
          {renderRankList(officialList)}
          <h1 className="global" style={displayStyle}>
            全球榜
          </h1>
          {renderRankList(globalList, true)}
        </div>
      </Scroll>

      {renderRoutes(route.routes)}
    </Container>
  );
}

const mapStateToProps = state => ({
  rankList: state.getIn(["rank", "rankList"]),
  loading: state.getIn(["rank", "loading"])
});

const mapDispatchToProps = dispatch => ({
  getRankListDataDispatch() {
    dispatch(getRankList());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(Rank));
