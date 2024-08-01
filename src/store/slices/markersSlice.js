import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import { get, ref, set } from "firebase/database"
import { database } from "../../app/firebaseConfig"

const initialState = [
  {
    id: 1,
    location: { lat: 49.97, lng: 36.23724 },
    timestamp: 123846318551,
    next: null,
  },
  {
    id: 3,
    location: { lat: 49.976, lng: 36.2374 },
    timestamp: 123846319844,
    next: null,
  },
  {
    id: 4,
    location: { lat: 49.973, lng: 36.2377 },
    timestamp: 123846318483,
    next: null,
  },
  {
    id: 5,
    location: { lat: 49.971, lng: 36.23756 },
    timestamp: 123846317582,
    next: null,
  },
  {
    id: 6,
    location: { lat: 49.979, lng: 36.2397 },
    timestamp: 123846315853,
    next: null,
  },
]

const markersSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    setState: (state, action) => {
      state = action.payload
      return action.payload
    },
    addMarker: (state, action) => {
      const newMarker = {
        id: uuidv4(),
        location: { ...action.payload },
        timestamp: new Date().getTime(),
        next: null,
      }
      state.push(newMarker)
      addMarkerToDB(newMarker)
      getMarkersFromDB() // to check if it works
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

async function addMarkerToDB(marker) {
  await set(ref(database, "quests/quest-" + marker.id), marker)
}

async function getMarkersFromDB() {
  const snapshot = await get(ref(database, "quests"))
  if (snapshot.exists()) {
    const array = Object.values(snapshot.val())
    console.log(array)
    return array
  } else {
    console.log("No data available")
  }
}

export const {
  addMarker,
  removeMarker,
  clearMarkers,
  updatePosition,
  setState,
} = markersSlice.actions
export default markersSlice.reducer
