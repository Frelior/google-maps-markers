import MarkerType from "@/app/interfaces/Marker"
import { AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps"
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import {
  removeMarker,
  updatePosition,
} from "../../../store/slices/markersSlice"
import "./marker.css"

export default function Marker({
  marker,
  customRef,
}: {
  marker: MarkerType
  customRef: any
}) {
  const markers: any[] = useSelector((state: any) => state.markers)
  const [infoWindow, setInfoWindow] = useState(false)
  const markerNumber = markers.indexOf(marker) + 1
  const dispatch = useDispatch()

  return (
    <>
      <AdvancedMarker
        ref={customRef}
        draggable={true}
        position={marker.location}
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
          position={marker.location}
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
