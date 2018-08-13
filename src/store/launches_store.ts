import { Reducer } from "redux";
import axios from "axios";
import { AppThunkAction } from ".";
import { Launch } from "./models";

// State
export interface ILaunchesState {
  isLoading: boolean;
  launches?: Launch[];
  error?: any;
}

const initialLaunchesState: ILaunchesState = {
  isLoading: false,
  launches: []
};

// Actions
interface IFetchLaunchesRequested {
  type: "FETCH_LAUNCHES_REQUESTED";
}

interface IFetchLaunchesReceived {
  type: "FETCH_LAUNCHES_RECEIVED";
  launches: Launch[];
}

interface IFetchLauncheseRejected {
  type: "FETCH_LAUNCHES_REJECTED";
  error: any;
}

type KnownAction =
  | IFetchLaunchesRequested
  | IFetchLaunchesReceived
  | IFetchLauncheseRejected;

// Action Creators
export const actionCreators = {
  fetchLaunches: (): AppThunkAction<KnownAction> => dispatch => {
    dispatch({ type: "FETCH_LAUNCHES_REQUESTED" });

    axios
      .get("https://api.spacexdata.com/v2/launches")
      .then(response => {
        const launches = response.data as Launch[];
        dispatch({
          type: "FETCH_LAUNCHES_RECEIVED",
          launches
        });
      })
      .catch(error => {
        dispatch({
          type: "FETCH_LAUNCHES_REJECTED",
          error
        });
      });
  }
};

export const reducer: Reducer<ILaunchesState> = (
  state: ILaunchesState = initialLaunchesState,
  action: KnownAction
) => {
  // make partial object of state to combine at the end
  let partialState: Partial<ILaunchesState> | undefined;

  switch (action.type) {
    case "FETCH_LAUNCHES_REQUESTED":
      partialState = { isLoading: true };
      break;
    case "FETCH_LAUNCHES_RECEIVED":
      partialState = { isLoading: false, launches: action.launches };
      break;
    case "FETCH_LAUNCHES_REJECTED":
      partialState = { isLoading: false, error: action.error };
      break;
    default:
      // The following line guarantees that every action in the
      // KnownAction union has been covered by a case above
      // tslint:disable-next-line
      const exhaustiveCheck: never = action;
      console.debug(exhaustiveCheck);
  }

  // return state updated with partial state
  return partialState != null ? { ...state, ...partialState } : state;
};
