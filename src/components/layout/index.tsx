import * as React from "react";
import { Navbar } from "./navbar";
import { RouteComponentProps, withRouter } from "react-router";
import { Container } from "semantic-ui-react";

interface ILayoutProps {}
type LayoutProps = ILayoutProps & RouteComponentProps<{}>;

class _Layout extends React.Component<LayoutProps, {}> {
  public render() {
    return (
      <Container>
        <Navbar location={this.props.location.pathname} />
        {this.props.children}
      </Container>
    );
  }
}

export const Layout = withRouter(_Layout);
