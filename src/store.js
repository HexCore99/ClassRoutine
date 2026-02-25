import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/Form/formSlice";
import courseReducer from "./features/course/courseSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    course: courseReducer,
  },
});
export default store;
