import React, {Component} from 'react';
import {Recipe} from '../recipe/recipe';
import './recipes.css';
import axios from 'axios'

export class Recipes extends Component {
  url = "http://10.0.1.119:8080/api/v1/recipes/"

  state = {
    recipes: []
  }

  componentWillMount = () => {
    this.get()
  }

  get = () => {
    axios.get(this.url).then((recipes) => {
      this.setState({recipes: recipes.data})
    })
  }

  delete = (id) => () => {
    this.setState({
      recipes: this.state.recipes.filter(item => item.id !== id)
    })
    axios.delete(this.url+id)
  }

  add = (recipe) => {
    axios.post(this.url, {...recipe,ingredients:[{
      "recipeId": 1,
      "ingredientId": 1,
      "name": "Dark rum (Appleton Estate Reserve)",
      "quantity": 2,
      "unit": "oz"
    }], instructions: "Coucou"}).then( () =>
      this.setState({
        recipes: this.state.recipes.concat({...recipe, id: (this.state.recipes.length+1000)})
      })
    );
  }

  upt = (recipe) => {
    axios.patch(this.url, recipe).then( () =>
      this.get()
    )
  }

  render() {
    return (
      <div className="cont">
        {this.state.recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe} delete={this.delete} upt={this.upt}/> )}
        <Recipe recipe={{name:"name", description:"description", picture:"https://bit.ly/2rk3QdR"}} new="true" delete={this.delete} create={this.add} upt={this.upt}/>
      </div>
    );
  }
}