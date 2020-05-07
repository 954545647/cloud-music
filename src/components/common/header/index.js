import React from "react";
import { HeaderContainer } from "./style";
import PropTypes from "prop-types";
const Header = React.forwardRef((props, ref) => {
  const { handleClick, title, isMarquee } = props;
  return (
    <HeaderContainer ref={ref}>
      <i className="iconfont back" onClick={handleClick}>
        &#xe655;
      </i>
      {isMarquee ? (
        // eslint-disable-next-line
        <marquee>
          <h1>{title}</h1>
        </marquee>
      ) : (
        <h1>{title}</h1>
      )}
    </HeaderContainer>
  );
});

Header.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.string,
  isMarquee: PropTypes.bool
};

Header.defaultProps = {
  handleClick: () => {},
  title: "标题",
  isMarquee: false
};

export default React.memo(Header);
