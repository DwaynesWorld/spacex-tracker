import * as React from "react";

export class Launches extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }
  public render() {
    return <div>Launches page!!</div>;
  }
}
