import React, { Component } from 'react';
import Map from './Container/Map/Map';
import Layout from './hoc/Layout/Layout';
import './App.css';
import "leaflet/dist/leaflet.css";
import './Mock/data1.js';
import './Mock/data2.js';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Map />
        </Layout>
      </div>
    );
  }
}

export default App;
