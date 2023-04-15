import React from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import BottomNav from "./BottomNav";
import NavbarTop from "./NavbarTop";
import SearchBar from "./SearchProduct";
interface propstype {
  iconNumber: number;
}
export default function Navbar(props: propstype) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {isSmallScreen ? (
        <>
          <SearchBar /> <BottomNav iconNumber={props.iconNumber} />{" "}
        </>
      ) : (
        <NavbarTop />
      )}
    </>
  );
}
