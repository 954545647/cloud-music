import styled from "styled-components";
import style from "../../../assets/global-style";

export const SongList = styled.div`
  border-radius: 10px;
  opacity: 0.98;
  ${props =>
    props.showBackground
      ? `background: ${style["highlight-background-color"]}`
      : ""};
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
    display: inline-block;
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
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 130px;
    color: ${style["font-color-light"]};
    border-radius: 3px;
    background: ${style["theme-color"]};
    font-size: 0;
    line-height: 34px;
    box-sizing: border-box;
    .iconfont {
      vertical-align: top;
      font-size: 10px;
      margin: 0 5px 0 10px;
    }
    span {
      font-size: ${style["font-size-s"]};
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
