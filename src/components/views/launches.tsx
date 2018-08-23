import * as React from "react";
import { connect } from "react-redux";
import { Grid, Image } from "semantic-ui-react";
import { RouteComponentProps } from "react-router";

import * as LaunchesStore from "../../store/launches_store";
import { IApplicationState } from "../../store";
import { Launch } from "../../store/models";

interface ILaunchesProps {}

type LaunchesProps = ILaunchesProps &
  LaunchesStore.ILaunchesState &
  typeof LaunchesStore.actionCreators &
  RouteComponentProps<{}>;

class _Launches extends React.Component<LaunchesProps> {
  public componentDidMount() {
    this.props.fetchLaunches();
  }

  public render() {
    return (
      <Grid divided relaxed container>
        <Grid.Row />
        <Grid.Row>
          <Grid.Column width={3} />
          <Grid.Column width={13}>
            {this.props.launches &&
              this.props.launches.map(launch => this.renderLaunchRow(launch))}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  renderLaunchRow = (launch: Launch) => {
    const { flight_number, mission_name, links } = launch;

    return (
      <Grid.Row key={flight_number}>
        <Grid.Column width={3}>
          <Image src={links.mission_patch_small} />
        </Grid.Column>
        <Grid.Column width={13}>
          <h2>
            {flight_number} - {mission_name}
          </h2>
          <p>{launch.details}</p>
        </Grid.Column>
      </Grid.Row>
    );
  };
}

export const Launches = connect(
  (state: IApplicationState) => state.launches,
  LaunchesStore.actionCreators
)(_Launches);
