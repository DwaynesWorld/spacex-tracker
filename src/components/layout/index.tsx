import * as React from "react";
import { Navbar } from "./navbar";
import styled from "styled-components";
import { RouteComponentProps, withRouter } from "react-router";

interface ILayoutProps {}
type LayoutProps = ILayoutProps & RouteComponentProps<{}>;

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

class _Layout extends React.Component<LayoutProps, {}> {
  public render() {
    return (
      <StyledDiv>
        <Navbar location={this.props.location.pathname} />
        {this.props.children}
      </StyledDiv>
    );
  }
}

export const Layout = withRouter(_Layout);
