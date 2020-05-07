import styled from "styled-components";
import style from "../../assets/global-style";

export const Container = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
  .offical,
  .global {
    margin: 10px 5px;
    font-weight: 700;
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
  }
  .offical {
    padding-top: 25px;
  }
`;

export const List = styled.ul`
  display: ${props => (props.globalRank ? "flex" : "")};
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 5px;
  flex-wrap: wrap;
  background: ${style["background-color"]};
  &::after {
    content: "";
    display: block;
    width: 32vw;
  }
`;

export const ListItem = styled.li`
  display: ${props => (props.tracks.length ? "flex" : "")};
  padding: 3px 0;
  .img_wrapper {
    position: relative;
    width: ${props => (props.tracks.length ? "27vw" : "32vw")};
    height: ${props => (props.tracks.length ? "27vw" : "32vw")};
    display: flex;
    flex-direction: row;
    .decorate {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0, 0%, 100%, 0), hsla(0, 0%, 43%, 0.4));
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 3px;
    }
    .update_frequency {
      position: absolute;
      bottom: 5px;
      left: 7px;
      margin: auto;
      font-size: ${style["font-size-ss"]};
      color: ${style["font-color-light"]};
    }
  }
`;

export const SongList = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;
  > li {
    font-size: ${style["font-size-s"]};
    color: grey;
  }
`;
