import React, {Component} from 'react';
//import {Recipes} from './recipes/recipes';
import {Ingredients} from './ingredients/ingredients'
import {Header} from './header/header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <body>
          <Ingredients/>
        </body>
      </div>
    );
  }
}

export default App;