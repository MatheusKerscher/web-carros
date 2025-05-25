import { Link } from "react-router-dom";

import LogoSvg from "../../assets/logo.svg?react";

type LogoProps = {
  width?: number;
};

const Logo = ({ width }: LogoProps) => {
  return (
    <Link to="/">
      <LogoSvg width={width} />
    </Link>
  );
};

export default Logo;
