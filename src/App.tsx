import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Layout } from "./components/layout";
import { Home, Launches, Pads, Rockets } from "./components/views";

export class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path="/rockets" component={Rockets} />
            <Route path="/launches" component={Launches} />
            <Route path="/pads" component={Pads} />
            <Route path="/" component={Home} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}
