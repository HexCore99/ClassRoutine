import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./features/Form/formSlice";
import courseReducer from "./features/course/courseSlice";
import loginReducer from "./features/Login/loginSlice";
import signupReducer from "./features/Signup/signupSlice";

const store = configureStore({
  reducer: {
    form: formReducer,
    course: courseReducer,
    login: loginReducer,
    signup: signupReducer,
  },
});
export default store;
