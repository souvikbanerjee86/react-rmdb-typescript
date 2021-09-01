import React, { useState, useEffect, useRef } from "react";

import SearchIcon from "../../images/search-icon.svg";
import { Wrapper, Content } from "./SearchBar.styles";

type Props = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const SearchBar: React.FC<Props> = ({ setSearchTerm }) => {
  const [state, setState] = useState("");
  const initial = useRef(true);
  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);
    return () => clearTimeout(timer);
  }, [state, setSearchTerm]);
  return (
    <Wrapper>
      <Content>
        <img src={SearchIcon} alt="search-icon" />
        <input
          type="text"
          placeholder="Search Movies"
          value={state}
          onChange={(e) => setState(e.currentTarget.value)}
        />
      </Content>
    </Wrapper>
  );
};

export default SearchBar;
