import React, { Component } from 'react';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import './recipe.css'

export class Recipe extends Component {
  state = {
    recipe: this.props.recipe,
    editMode: false,
    newRecipeMode: this.props.new,
    pendingMode: false
  }

  toogleEditMode = () => {
    this.setState({ editMode: !this.state.editMode });
  }

  onNameChange = (event) => {
    this.setState({ recipe: { ...this.state.recipe, name: event.target.value } })
  }
  onPictureChange = (event) => {
    this.setState({ recipe: { ...this.state.recipe, picture: event.target.value } })
  }
  onDescriptionChange = (event) => {
    this.setState({ recipe: { ...this.state.recipe, description: event.target.value } })
  }

  toogleNewMode = () => {
    this.setState({ pendingMode: true, editMode: true, newRecipeMode: false})
  }

  reset = () => {
    this.props.create(this.state.recipe)
    this.setState({
      recipe: ({name: "name", picture: "https://bit.ly/2rk3QdR", description: "description"}),
      editMode: false,
      newRecipeMode: this.props.new,
      pendingMode: false
    })
  }

  upt = () => {
    if (this.state.editMode) {
      this.props.upt(this.state.recipe)
    }
    this.toogleEditMode()
  }

  render() {
    let { recipe } = this.state;
    if (! this.state.newRecipeMode) {
      return (
        <Card color="info" className="Card">
          <div className="Cardhead">
            <CardImg src={recipe.picture} className="Cardimg"/>
            <CardTitle className="Cardtitle">{recipe.name}</CardTitle>
          </div>
          {this.state.editMode ?
            <CardBody className="Cardbody">
              <input type="text" value={recipe.picture} onChange={this.onPictureChange} />
              <input type="text" value={recipe.name} onChange={this.onNameChange} />
              <input type="textarea" value={recipe.description} onChange={this.onDescriptionChange} />
            </CardBody>
            :
            <CardBody className="Cardbody">
              <CardText className="Cardtext">{recipe.description}</CardText>
            </CardBody>
          }
          {this.state.pendingMode ?
            <div>
              <Button color="info" className="newRecipeSmall" onClick={this.reset}><FontAwesomeIcon icon={faPlus} /></Button>
            </div>
            :
            <div className="buttons">
              <Button color="info" onClick={this.upt}><FontAwesomeIcon icon={faPen} /></Button>
              <Button color="info" onClick={this.props.delete(recipe.id)}><FontAwesomeIcon icon={faTrash} /></Button>
            </div>
          }
        </Card>
      );
    } else {
      return (
        <Card color="info" className="Card">
          <CardBody>
            <Button color="info" className="newRecipe" onClick={this.toogleNewMode}><FontAwesomeIcon icon={faPlus} /></Button>
          </CardBody>
        </Card>
      );
    }
  }
}