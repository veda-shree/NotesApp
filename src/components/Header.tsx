import * as React from "react";
import { Navbar } from "react-bootstrap";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <Navbar fixed="top" bg="dark" variant="dark">
      <Navbar.Brand>React Typescript</Navbar.Brand>
    </Navbar>
  );
};

export default Header;
