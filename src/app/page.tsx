"use client"
import styles from "./page.module.css"
import MapComponent from "./components/MapComponent/MapComponent"
import { Provider } from "react-redux"
import store from "../store/store"

export default function Home() {
  return (
    <div className={styles.main}>
      <Provider store={store}>
        <MapComponent></MapComponent>
      </Provider>
    </div>
  )
}
