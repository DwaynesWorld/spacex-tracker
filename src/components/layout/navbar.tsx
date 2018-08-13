import * as React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

interface INavbarProps {
  location: string;
}

export const Navbar = (props: INavbarProps) => (
  <Menu inverted={true} fixed="top" size="small">
    <Link to="/">
      <Menu.Item
        active={props.location && props.location === "/" ? true : false}
      >
        Home
      </Menu.Item>
    </Link>
    <Link to="/rockets">
      <Menu.Item
        active={props.location && props.location === "/rockets" ? true : false}
      >
        Rockets
      </Menu.Item>
    </Link>
    <Link to="/launches">
      <Menu.Item
        active={props.location && props.location === "/launches" ? true : false}
      >
        Launches
      </Menu.Item>
    </Link>
    <Link to="/pads">
      <Menu.Item
        active={props.location && props.location === "/pads" ? true : false}
      >
        Launch Pads
      </Menu.Item>
    </Link>
  </Menu>
);
