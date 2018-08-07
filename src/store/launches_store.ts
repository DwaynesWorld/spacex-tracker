import { Action, ActionCreator, Reducer } from "redux";
import axios, from "axios";

// State
export interface LaunchesState {
    isLoading: boolean,
    launches?: Array<any>,
    error?: any
}

const initialLaunchesState : LaunchesState = {
    isLoading: false,
    launches: [],
}


// Actions
interface fetchLaunchesRequested {
    type: "FETCH_LAUNCHES_REQUESTED";
}

interface fetchLaunchesReceived {
    type: "FETCH_LAUNCHES_RECEIVED";
    launches: [];
}

interface fetchLauncheseRejected {
    type: "FETCH_LAUNCHES_REJECTED";
    error: any;
}

type KnownAction = fetchLaunchesRequested | fetchLaunchesReceived | fetchLauncheseRejected;

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void): any;
}

// Action Creators
export const actionCreators = {
    fetchLaunches: (): AppThunkAction<KnownAction> => dispatch => {
        dispatch( {type: "FETCH_LAUNCHES_REQUESTED"});

        axios.get("https://api.spacexdata.com/v2/launches")
        .then(response => {
            const launches = response.data;
            dispatch({
                type: "FETCH_LAUNCHES_RECEIVED",
                launches
            });
        }).catch(error => {
            dispatch({
                type: "FETCH_LAUNCHES_REJECTED",
                error
            })
        })
    }
}

export const reducer: Reducer<LaunchesState> = (
    state: LaunchesState = initialLaunchesState,
    action: KnownAction
  ) => {
    //make partial object of state to combine at the end
    let partialState: Partial<LaunchesState> | undefined;
  
    switch (action.type) {
      case "FETCH_LAUNCHES_REQUESTED":
        partialState = { isLoading: true };
        break;
      case "FETCH_LAUNCHES_RECEIVED":
        //set table in state to reference later
        partialState = { isLoading: false, launches: action.launches };
        break;
      case "FETCH_LAUNCHES_REJECTED":
        partialState = { isLoading: false, error: action.error };
        break;
      default:
        // The following line guarantees that every action in the KnownAction union has been covered by a case above
        const exhaustiveCheck: never = action;
    }
  
    //return state updated with partial state
    return partialState != null ? { ...state, ...partialState } : state;
  };



