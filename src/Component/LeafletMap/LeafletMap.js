import 'leaflet/dist/leaflet.css';
import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import Marker from '../Markers/Marker';
import './LeafletMap.css';

const leafletMap = (props) => {

  const { markers, onMapLoad, onMoveEnd, currentLng, currentLat, saveNote, handleChange, markClicked } = props;
  const mapPositions = [currentLat, currentLng];

  var markerList = markers.map((m, index) => {
  const isCurrentUser = m.userName === 'Current User';

    return (
      <Marker
        key={m.Id + '-' + index}
        userName={m.userName}
        note={m.note}
        location={m.location}
        isCurrentPos={isCurrentUser}
        position={[m.lat / 1000000, m.lng / 1000000]}
        saveNote={isCurrentUser ? saveNote : null}
        handleChange={isCurrentUser ? handleChange : null}
        markClicked={markClicked} />
    )
  });

  return (
    <Map
      data-testid="mainMap"
      className="map"
      preferCanvas={true}
      center={[mapPositions[0], mapPositions[1]]}
      zoom={13}
      whenReady={onMapLoad}
    >
      <TileLayer
        url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {markerList}
    </Map>
  )
}

export default leafletMap;
