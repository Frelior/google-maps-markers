"use client"
import {
  APIProvider,
  Map,
  MapControl,
  ControlPosition,
} from "@vis.gl/react-google-maps"
import { useSelector, useDispatch } from "react-redux"
import { addMarker, clearMarkers } from "../../../store/slices/markersSlice"
import "./mapComponent.css"
import State from "@/app/interfaces/State"
import MarkersGroup from "../MarkersGroup/MarkersGroup"

export default function MapComponent() {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  const MAP_ID = process.env.NEXT_PUBLIC_MAP_ID
  const initialPosition = { lat: 49.99, lng: 36.24 }
  const markersState = useSelector((state: State) => state.markers)
  const dispatch = useDispatch()


  return (
    <APIProvider apiKey={API_KEY as string}>
      <Map
        id="map"
        mapId={MAP_ID as string}
        defaultCenter={initialPosition}
        defaultZoom={13}
        onClick={(e) => {
          dispatch(
            addMarker({ lat: e.detail.latLng!.lat, lng: e.detail.latLng!.lng })
          )
        }}
      >
        <MapControl position={ControlPosition.RIGHT_CENTER}>
          <button
            className="clear-markers"
            onClick={() => dispatch(clearMarkers())}
          >
            Clear Markers
          </button>
        </MapControl>

        <MarkersGroup pointsArray={markersState}></MarkersGroup>
      </Map>
    </APIProvider>
  )
}
