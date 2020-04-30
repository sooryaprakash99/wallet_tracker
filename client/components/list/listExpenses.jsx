import React, { Component } from 'react';

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
                <td>{this.props.item.desc}</td>
                <td>{this.props.item.income}</td>
                <td>{this.props.item.amount}</td>
                <td><button
                    onClick={() => this.props.editItem(this.props.index)}>Edit</button></td>
                <td><button
                    onClick={() => this.props.deleteItem(this.props.id, this.props.index)}>Delete</button></td>
            </tr>
        );

    }

}

export default ListExpenses;