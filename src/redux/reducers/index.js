import { combineReducers } from "redux";
import AboutReducer from "./AboutReducer";
import BlogReducer from "./BlogReducer";
import CategoryReducer from "./CategoryReducer";
import CommonReducer from "./CommonReducer";
import DemoVideoReducer from "./DemoVideoReducer";
import GalleryReducer from "./GalleryReducer";
import HomeReducer from "./HomeReducer";
import PolicyReducer from "./PolicyReducer";
import LinkReducer from "./LinkReducer";
import ResultReducer from "./ResultReducer";

const userReducers = {
  GalleryReducer,
  PolicyReducer,
  AboutReducer,
  CategoryReducer,
  CommonReducer,
  DemoVideoReducer,
  HomeReducer,
  BlogReducer,
  LinkReducer,
  ResultReducer,
};

const rootReducer = combineReducers({
  ...userReducers,
});

export default rootReducer;
