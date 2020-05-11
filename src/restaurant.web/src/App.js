import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import StickyHeadTable from './components/ListCategories'
import SimpleBottomNavigation from './components/Menu'
import SimpleTabs from './components/Tabs'

class App extends Component {
  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <SimpleTabs />
          <br />
          <SimpleBottomNavigation />
      </div>
     
    );
  }
}

export default App;
