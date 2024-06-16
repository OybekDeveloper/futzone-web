import { configureStore } from "@reduxjs/toolkit";
import event from "./redux";

export const store = configureStore({
  reducer: { event },
});
