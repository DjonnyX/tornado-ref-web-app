import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state";
import userReducer from './user.reduser';

const rootReducer: ActionReducerMap<IAppState> = {
  user: userReducer,
};
export default rootReducer;
