import React, {Component} from 'react';
import {Recipes} from './recipes/recipes';
import {Header} from './header/header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <body>
          <Recipes/>
        </body>
      </div>
    );
  }
}

export default App;