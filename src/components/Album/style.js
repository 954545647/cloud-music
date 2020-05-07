import styled from "styled-components";
import style from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 100;
  background: ${style["background-color"]};
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    opacity: 0;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    opacity: 1;
    transition: all 0.3s;
    transform: rotateZ(0) translate3d(0, 0, 0);
  }
  &.fly-exit {
    opacity: 1;
    transform: rotateZ(0) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    opacity: 0;
    transition: all 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`;

export const TopDesc = styled.div`
  background-size: 100%;
  width: 100%;
  height: 275px;
  padding: 5px 20px;
  padding-bottom: 50px;
  margin-bottom: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: relative;
  .background {
    background: url(${props => props.background}) no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
    z-index: -1;
    filter: blur(20px);
    position: absolute;
    background-position: 0 0;
    .filter {
      position: absolute;
      z-index: 10;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 28, 0.2);
    }
  }
  .img_wrapper {
    width: 120px;
    height: 120px;
    position: relative;
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${style["font-size-s"]};
      line-height: 15px;
      color: ${style["font-color-light"]};
      .play {
        vertical-align: top;
      }
    }

    img {
      width: 120px;
      height: 120px;
      border-radius: 3px;
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0 10px;
    height: 120px;
    .title {
      max-height: 70px;
      color: ${style["font-color-light"]};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${style["font-size-l"]};
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
      }
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .name {
        line-height: 20px;
        font-size: ${style["font-size-m"]};
        color: ${style["font-color-desc-v2"]};
      }
    }
  }
`;

export const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px 20px 30px;
  margin: -100px 0 0 0;
  > div {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    font-size: ${style["font-size-s"]};
    color: ${style["font-color-light"]};
    z-index: 1000;
    font-weight: 500;
    .iconfont {
      font-size: 20px;
    }
  }
`;

export const SongList = styled.div`
  border-radius: 10px;
  opacity: 0.98;
  .first_line {
    box-sizing: border-box;
    padding: 10px 0;
    margin-left: 10px;
    position: relative;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid ${style["border-color"]};
  }
  .play_all {
    line-height: 24px;
    color: ${style["font-color-desc"]};
    .iconfont {
      font-size: 24px;
      margin-right: 10px;
      vertical-align: top;
    }
    .sum {
      font-size: ${style["font-size-s"]};
      color: ${style["font-color-desc-v2"]};
      margin-left: 5px;
    }
    > span {
      vertical-align: top;
    }
  }
  .add_list {
    display: flex;
    align-items: center;
    text-align: center;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 130px;
    border-radius: 3px;
    background: ${style["theme-color"]};
    font-size: 0;
    line-height: 34px;
    justify-content: space-around;
    padding: 0 10px;
    box-sizing: border-box;
    .iconfont {
      vertical-align: top;
      font-size: 10px;
      margin: 0 5px 0 10px;
      color: ${style["font-color-light"]};
    }
    span {
      font-size: ${style["font-size-s"]};
      color: ${style["font-color-light"]};
      line-height: 34px;
    }
  }
`;
export const SongItem = styled.ul`
  > li {
    display: flex;
    height: 60px;
    align-items: center;
    .index {
      flex-basis: 60px;
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .info {
      box-sizing: border-box;
      flex: 1;
      display: flex;
      height: 100%;
      padding: 5px 0;
      flex-direction: column;
      justify-content: space-around;
      border-bottom: 1px solid ${style["border-color"]};
      ${style.noWrap()}
      >span {
        ${style.noWrap()}
      }
      > span:first-child {
        color: ${style["font-color-desc"]};
      }
      > span:last-child {
        font-size: ${style["font-size-s"]};
        color: #bba8a8;
      }
    }
  }
`;
