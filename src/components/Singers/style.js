import styled from "styled-components";
import style from "../../assets/global-style";

export const Content = styled.div`
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  top: 100px;
  padding: 5px;
  overflow: hidden;
`;

export const List = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  overflow: hidden;
`;
export const ListItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: 0 5px;
  padding: 5px 0;
  align-items: center;
  border-bottom: 1px solid ${style["border-color"]};
  .img_wrapper {
    margin-right: 20px;
    img {
      border-radius: 3px;
      width: 50px;
      height: 50px;
    }
  }
  .name {
    font-size: ${style["font-size-m"]};
    color: ${style["font-color-desc"]};
    font-weight: 500;
  }
`;

export const ListContainer = styled.div`
  box-sizing: border-box;
  position: fixed;
  /* height: 100%; */
  width: 100%;
  top: 170px;
  left: 0;
  bottom: 0;
  overflow: hidden;
`;
