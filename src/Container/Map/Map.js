import 'leaflet/dist/leaflet.css';
import React, { Component } from 'react';
import LeafletMap from '../../Component/LeafletMap/LeafletMap';
import SearchBar from '../../Component/SearchBar/SearchBar';
import customAxios from '../../customAxios';
import Drawer from '../../Component/Drawer/Drawer';

class Map extends Component {

  state = {
    map: null,
    markers: [],
    mapChanged: false,
    newNote: '',
    savedNote: '',
    error: false,
    currentLng: null,
    currentLat: null,
    keyword: '',
    searchBy: 'Name',
    showDetails: false,
    markDetails: ''
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          currentLng: position.coords.longitude,
          currentLat: position.coords.latitude
        });
      }, (error) => error, { enableHighAccuracy: true })
    }
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.savedNote !== this.state.savedNote) {
      var cloneMarkers = [...prevState.markers];
      var currentMarkerInd = cloneMarkers.findIndex(marker => marker.userName === 'Current User');
      cloneMarkers[currentMarkerInd].note = this.state.savedNote;
      this.setState({ markers: cloneMarkers, markDetails: cloneMarkers[currentMarkerInd] });
    }
  }

  onMapLoad = (event) => {
    const updatedMap = event.target;

    customAxios.get('/getdata', {
      params: {
        keyword: '',
        searchBy: '',
        currentLng: this.state.currentLng,
        currentLat: this.state.currentLat,
      }
    })
      .then(res => {
        console.log(res);
        res.data.markers.push({
          id: res.data.markers.length + 1,
          location: "Current Location",
          lat: this.state.currentLat * 1000000,
          lng: this.state.currentLng * 1000000,
          note: this.state.saveNote,
          userName: 'Current User',
        });

        this.setState({ markers: res.data.markers, mapChanged: false });
      })
      .catch(err => {
        this.setState({ error: true });
      })
  }


  saveNote = (event) => {
    customAxios.post('/postdata', {
      note: this.state.newNote,
      id: this.state.markers.target,
      userName: 'Current User'
    })
      .then(res => {
        this.setState({ savedNote: res.data.savedNote.note });
      })
      .catch(err => {
        this.setState({ error: true });
      })
  }

  handleChange = (event) => {
    this.setState({ newNote: event.target.value });
  }

  setKeyword = (event) => {
    customAxios.get('/getdata', {
      params: {
        keyword: event.target.value,
        searchBy: this.state.searchBy,
        currentLng: this.state.currentLng,
        currentLat: this.state.currentLat
      }
    })
      .then(res => {
        var dataArr = res.data.markers.length > 1
          ? [...res.data.markers] : res.data.markers.length === 0
            ? [] : [{ ...res.data.markers }];
        console.log(dataArr);

        dataArr.push({
          id: res.data.markers.length + 1,
          location: "Current Location",
          lat: this.state.currentLat * 1000000,
          lng: this.state.currentLng * 1000000,
          note: this.state.saveNote,
          userName: 'Current User',
        });

        this.setState({ markers: dataArr, mapChanged: false });
      })
      .catch(err => {
        this.setState({ error: true });
      })
  }

  setSearchBy = (event) => {
    this.setState({ searchBy: event.target.value });
  }

  markClicked = (markDetails) => {
    this.setState({ markDetails: markDetails, showDetails: true });
  }

  arrowClicked = () => {
    this.setState({ showDetails: false });
  }

  render() {
    return (
      this.state.currentLng && this.state.currentLat ? (
        <React.Fragment>
          <SearchBar
            searchBy={this.state.searchBy}
            setSearchBy={event => this.setSearchBy(event)}
            setKeyword={event => this.setKeyword(event)} />
          <LeafletMap
            markers={this.state.markers}
            zoomLevel={this.state.zoomLevel}
            currentLat={this.state.currentLat}
            currentLng={this.state.currentLng}
            saveNote={event => this.saveNote(event)}
            handleChange={event => this.handleChange(event)}
            markClicked={event => this.markClicked(event)}
            onMapLoad={event => this.onMapLoad(event)}
            onMoveEnd={event => this.onMoveEnd(event)} />
          <Drawer
            handleChange={event => this.handleChange(event)}
            saveNote={event => this.saveNote(event)}
            markDetails={this.state.markDetails}
            showDetails={this.state.showDetails}
            arrowClicked={this.arrowClicked} />
        </React.Fragment>
      )
        : !this.state.error
          ? <span style={{ color: 'green' }}>Loading...</span>
          : <span style={{ color: 'red' }}>Network Error</span>
    )
  }
}

export default Map;