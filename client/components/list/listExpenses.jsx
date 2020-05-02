import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class ListExpenses extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        console.log(this.props.item);
        return (
            <tr key={this.props.id}>
                <td>{this.props.item.title}</td>
                <td>{this.props.item.timestamp}</td>
                <td>{this.props.item.description}</td>
                <td>{this.props.item.income}</td>
                <td>{this.props.item.amount}</td>
                <td><Button variant="secondary"
                    onClick={() => this.props.editItem(this.props.index)}>Edit</Button></td>
                <td><Button variant="danger"
                    onClick={() => this.props.deleteItem(this.props.id, this.props.index)}>Delete</Button></td>
            </tr>
        );

    }

}

export default ListExpenses;