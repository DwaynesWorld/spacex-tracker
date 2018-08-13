import * as React from "react";
import { connect } from "react-redux";
import * as LaunchesStore from "../../store/launches_store";
import { IApplicationState } from "../../store";
import { RouteComponentProps } from "../../../node_modules/@types/react-router";
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
      <div>
        <h1>Launches page!!</h1>
        {this.props.launches &&
          this.props.launches.map(l => this.renderLaunch(l))}
      </div>
    );
  }

  renderLaunch = (launch: Launch) => {
    //console.log(JSON.stringify(launch));

    const flight = launch.flight_number;
    const name = launch.mission_name;
    return <div key={flight}>{name}</div>;
  };
}

export const Launches = connect(
  (state: IApplicationState) => state.launches,
  LaunchesStore.actionCreators
)(_Launches);
