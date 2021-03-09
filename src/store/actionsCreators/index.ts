import * as UserActionCreators from "./addressActions";
import * as TodoActionCreators from "./orderActions";

export default {
  ...TodoActionCreators,
  ...UserActionCreators,
};
