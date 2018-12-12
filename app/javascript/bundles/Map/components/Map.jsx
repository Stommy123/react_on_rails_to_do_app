import React, { Component } from 'react'
import mapboxgl from 'mapbox-gl'
import axios from 'axios'

class Map extends Component {

  constructor(){
    super()
    window.map = this
  }

  render() {
    return(
      <div
        style={{
          width: '100%',
          height: '500px',
          marginTop: '10px',
          backgroundColor: 'azure'
        }}
        ref={el => this.mapContainer = el}
      />
    )
  }

  createMap = (mapOptions, geolocationOptions) => {
    this.map = new mapboxgl.Map(mapOptions)
    const map = this.map
    const { lat, lng } = map.getCenter()
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: geolocationOptions,
        trackUserLocation: true
      })
    )
    map.on('load', (event) => {
      map.addSource(
        'tasks',  {
                    type: 'geojson',
                    data: `/map.json?lat=${lat}&lng=${lng}`
                  }
      )
      map.addLayer({
        id:     'tasks',
        type:   'symbol',
        source: 'tasks',
        layout: {
          "icon-image": ['get', 'icon'],
          "icon-size":  0.05
        }
      })
      map.on('click', 'tasks', (e) => {
          var coordinates = e.features[0].geometry.coordinates.slice()
          var description = e.features[0].properties.description
          var location    = e.features[0].properties.location
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }
          new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`<a href=${location}>${description}</a>`)
              .addTo(map)
      })
      map.on('mouseenter', 'tasks', () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', 'tasks', () => {
        map.getCanvas().style.cursor = ''
      })
      map.on('moveend', () => { this.fetchTasks() })
    })
  }

  fetchTasks = () => {
    const map = this.map;
    const { lat, lng } = map.getCenter();
    axios.get(`/map.json?lat=${lat}&lng=${lng}`)
      .then((response) => {
        map.getSource('tasks').setData(response.data)
      })
  }

  flyTo = (long, lat) => {
    this.map.flyTo({
      center: [long, lat]
    })
  }

  componentDidMount() {
    let { coordinates, accessToken,
          styleUrl, centerOnUser } = this.props
    mapboxgl.accessToken = accessToken
    const mapOptions = {
      container: this.mapContainer,
      style: styleUrl,
      zoom: 12,
      center: coordinates
    }
    const geolocationOptions = {
      enableHighAccuracy: true,
      maximumAge:         30000,
      timeout:            27000
    }
    if( "geolocation" in navigator && centerOnUser ){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = [
                  position.coords.longitude,
                  position.coords.latitude
                ]
          document.getElementById("task_longitude")
            .value = coordinates[0]
          document.getElementById("task_latitude")
            .value = coordinates[1]
          document.getElementById("use_current_location")
            .disabled = false
          mapOptions.center = coordinates
          this.createMap(mapOptions, geolocationOptions)
        },
        () => { this.createMap(mapOptions, geolocationOptions) },
        geolocationOptions
      )
    }else{
      this.createMap(mapOptions, geolocationOptions)
    }

  }

  componentWillUnmount() {
    this.map.remove()
  }

}

export default Map
