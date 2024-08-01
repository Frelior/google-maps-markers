import { configureStore } from "@reduxjs/toolkit"
import markersSlice from "./slices/markersSlice"

const store = configureStore({
  reducer: {
    markers: markersSlice,
  },
})

export default store
