import MarkerType from "@/app/interfaces/Marker"
import {
  AdvancedMarker,
  Pin,
  InfoWindow,
  CollisionBehavior,
} from "@vis.gl/react-google-maps"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import {
  removeMarker,
  updatePosition,
} from "../../../store/slices/markersSlice"
import "./marker.css"

export default function Marker({ marker }: { marker: MarkerType }) {
  const markers: any[] = useSelector((state: any) => state.markers)
  const [infoWindow, setInfoWindow] = useState(false)
  const position = { lat: marker.lat, lng: marker.lng }
  const markerNumber = markers.indexOf(marker) + 1
  const dispatch = useDispatch()
  return (
    <>
      <AdvancedMarker
        collisionBehavior={CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY}
        draggable={true}
        position={position}
        onClick={() => setInfoWindow(true)}
        onDragEnd={(e) => {
          const lat = e.latLng!.lat()
          const lng = e.latLng!.lng()
          dispatch(updatePosition({ id: marker.id, lat: lat, lng: lng }))
        }}
      >
        <Pin background={"blue"}>
          <p>{markerNumber}</p>
        </Pin>
      </AdvancedMarker>

      {infoWindow && (
        <InfoWindow
          position={position}
          onCloseClick={() => setInfoWindow(false)}
        >
          <button
            className="delete"
            onClick={() => {
              setInfoWindow(false)
              dispatch(removeMarker(marker.id))
            }}
          >
            Delete
          </button>
        </InfoWindow>
      )}
    </>
  )
}