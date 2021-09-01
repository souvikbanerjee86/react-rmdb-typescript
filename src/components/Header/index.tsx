import React, { useContext } from "react";
import { Link } from "react-router-dom";
import RMDBLogo from "../../images/react-movie-logo.svg";
import TMDBLogo from "../../images/tmdb_logo.svg";

import { Wrapper, Content, TMDBLogoImg, LogoImg } from "./Header.styles";
import { Context } from "../../Context";
const Header: React.FC = () => {
  const [user] = useContext<any>(Context);
  console.log(user);
  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <LogoImg src={RMDBLogo} alt="RmdbLogo" />
        </Link>
        {user ? (
          <span className="loggedin">Logged in as : {user.username}</span>
        ) : (
          <Link to="/login">
            <span className="login">Log In</span>
          </Link>
        )}
        <TMDBLogoImg src={TMDBLogo} alt="TMDBLogo" />
      </Content>
    </Wrapper>
  );
};

export default Header;
