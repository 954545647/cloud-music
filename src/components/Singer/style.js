import styled from "styled-components";
import style from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #f2f3f4;
  overflow: hidden;
  transform-origin: right bottom;
  &.fly-enter,
  &.fly-appear {
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
  &.fly-enter-active,
  &.fly-appear-active {
    transition: transform 0.3s;
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform 0.3s;
    transform: rotateZ(30deg) translate3d(100%, 0, 0);
  }
`;

export const ImgWrapper = styled.div`
  background: url(${props => `${props.bgUrl}?param=300x300`});
  background-size: cover;
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  transform-origin: top;
  .filter {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);
  }
`;
export const CollectButton = styled.div`
  position: relative;
  border-radius: 20px;
  background: ${style["theme-color"]};
  left: 0;
  right: 0;
  margin: auto;
  width: 120px;
  height: 40px;
  margin-top: -55px;
  text-align: center;
  line-height: 40px;
  color: ${style["font-color-light"]};
  box-sizing: border-box;
  z-index: 50;
  font-size: 0;
  .iconfont {
    display: inline-block;
    margin-right: 10px;
    font-size: 12px;
    vertical-align: 1px;
  }
  .collect {
    display: inline-block;
    font-size: 14px;
    letter-spacing: 5px;
  }
`;

export const SongListWrapper = styled.div`
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  > div {
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`;
export const BgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  z-index: 50;
`;
