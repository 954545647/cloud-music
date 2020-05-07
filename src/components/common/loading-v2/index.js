import React from "react";
import { Loading } from "./style";
function LoadingV2() {
  return (
    <Loading className="loading">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <span>拼命加载中...</span>
    </Loading>
  );
}

export default LoadingV2;
