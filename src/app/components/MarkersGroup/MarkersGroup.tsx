import MarkerType from "@/app/interfaces/Marker"
import { useMap } from "@vis.gl/react-google-maps"
import Marker from "../Marker/Marker"
import { useRef, useState, useEffect } from "react"
import {
  Marker as ClustererMarker,
  MarkerClusterer,
} from "@googlemaps/markerclusterer"

// i dont have idea about how this clustering works, just copypasted at 4am, and take my apologise for this code

export default function MarkersGroup({
  pointsArray,
}: {
  pointsArray: MarkerType[]
}) {
  const map = useMap()
  const [markers, setMarkers] = useState<{ [key: string]: ClustererMarker }>({})
  const clusterer = useRef<MarkerClusterer | null>(null)

  useEffect(() => {
    if (!map) return
    if (!clusterer.current) {
      clusterer.current = new MarkerClusterer({ map })
    }
  }, [map])

  useEffect(() => {
    clusterer.current?.clearMarkers()
    clusterer.current?.addMarkers(Object.values(markers))
  }, [markers])

  const setMarkerRef = (marker: ClustererMarker | null, key: number) => {
    if (marker && markers[key]) return
    if (!marker && !markers[key]) return

    setMarkers((prev) => {
      if (marker) {
        return { ...prev, [key]: marker }
      } else {
        const newMarkers = { ...prev }
        delete newMarkers[key]
        return newMarkers
      }
    })
  }

  return (
    <>
      {pointsArray.map((point) => (
        <Marker
          marker={point}
          key={point.id}
          customRef={(marker: any) => setMarkerRef(marker, point.id)}
          position={{ lat: point.lat, lng: point.lng }}
        />
      ))}
    </>
  )
}
