import { ActionReducerMap } from "@ngrx/store";
import { IAppState } from "../state";
import userReducer from './user.reduser';
import adminReducer from './admin.reducer';

const rootReducer: ActionReducerMap<IAppState> = {
  user: userReducer,
  admin: adminReducer,
};
export default rootReducer;
