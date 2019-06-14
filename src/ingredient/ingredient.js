import React, { Component } from 'react';
import { Button, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import './ingredient.css'

export class Ingredient extends Component {
    state = {
        ingredient: this.props.ingredient,
        editMode: false,
        newMode: this.props.new,
        pending: false
    }

    toogleEditMode = () => {
        this.setState({editMode: ! this.state.editMode})
    }

    toogleNewMode = () => {
        this.setState({ pending: true, editMode: true, newMode: false})
    }

    onNameChange = (event) => {
        this.setState({ ingredient: { ...this.state.ingredient, name:event.target.value}})
    }

    reset = () => {
        this.props.create(this.state.ingredient)
        this.setState({
            ingredient: {name:"ingredient"},
            editMode: false,
            newMode: true,
            pending: false
        })
    }

    upt = () => {
        if (this.state.editMode) {
            this.props.upt(this.state.ingredient)
        }
        this.toogleEditMode()
    }

    render() {
        let { ingredient } = this.state
        if (! this.state.newMode) {
            return (
                <ListGroupItem color="info">
                    <div className="item">
                        {this.state.editMode ?
                        <input type="text" value={ingredient.name} onChange={this.onNameChange}/>
                        :
                        <div className="title">{ingredient.name}</div>
                        }
                        {this.state.pending ?
                        <div>
                            <Button color="info" onClick={this.reset}><FontAwesomeIcon icon={faPlus} /></Button>
                        </div>
                        :
                        <div className="buttons">
                            <Button color="info" onClick={this.upt}><FontAwesomeIcon icon={faPen} /></Button>
                            <Button color="info" onClick={this.props.delete(ingredient.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                        </div>
                        }
                    </div>
                </ListGroupItem>
            )
        } else {
            return (
                <ListGroupItem color="info">
                    <div>
                        <Button className="addButton" color="info" onClick={this.toogleNewMode}><FontAwesomeIcon icon={faPlus} /></Button>
                    </div>
                </ListGroupItem>
            )
        }
    }
}