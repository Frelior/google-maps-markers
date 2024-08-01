import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

const initialState = [
  { id: 1, lat: 49.97, lng: 36.237 },
  { id: 2, lat: 49.98, lng: 36.235 },
  { id: 3, lat: 49.978, lng: 36.233 },
  { id: 4, lat: 49.975, lng: 36.232 },
  { id: 5, lat: 49.983, lng: 36.231 },
  { id: 6, lat: 49.978, lng: 36.2395 },
]

const markersSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    addMarker: (state, action) => {
      const newMarker = {
        id: uuidv4(),
        ...action.payload,
      }
      state.push(newMarker)
    },

    removeMarker: (state, action) => {
      return state.filter((marker) => marker.id !== action.payload)
    },

    updatePosition: (state, action) => {
      const marker = state.find((marker) => marker.id === action.payload.id)
      if (marker) {
        marker.lat = action.payload.lat
        marker.lng = action.payload.lng
      }
      return state
    },
    clearMarkers: () => {
      return []
    },
  },
})

export const { addMarker, removeMarker, clearMarkers, updatePosition } =
  markersSlice.actions
export default markersSlice.reducer
