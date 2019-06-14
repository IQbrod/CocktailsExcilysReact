import React, {Component} from 'react';
import {Ingredient} from '../ingredient/ingredient';
import {ListGroup} from 'reactstrap'
import axios from 'axios';
import './ingredients.css'

export class Ingredients extends Component {
    url = "http://10.0.1.119:8080/api/v1/ingredients/"

    state = {
        ingredients: []
    }

    componentWillMount = () => {
        this.get()
    }

    get = () => {
        axios.get(this.url).then( (ingredients) => {
            this.setState({ingredients: ingredients.data})
        })
    }

    create = (ingredient) => {
        axios.post(this.url, ingredient.name, {headers: {'Content-Type': 'application/json'}}).then(() =>
            {console.log("create");
            this.get()}
        )
    }

    upt = (ingredient) => {
        axios.patch(this.url, ingredient.name)
    }

    delete = (id) => () => {
        this.setState({
            ingredients: this.state.ingredients.filter(item => item.id !== id)
        })
        axios.delete(this.url+id)
    }

    render() {
        return (
            <ListGroup className="cont">
                {this.state.ingredients.map(ingredient => <Ingredient key={ingredient.id} ingredient={ingredient} delete={this.delete} upt={this.upt}/>)}
                <Ingredient ingredient={{name: "ingredient"}} new="true" create={this.create} delete={this.delete} upt={this.upt} />
            </ListGroup>
        )
    }
}