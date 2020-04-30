import React, { Component } from 'react';

class EditExpense extends Component {
  constructor(props) {
    super(props);
    this.edit = this.edit.bind(this);
  }

  edit() {
    var newObj = {
      id: this.props.id,
      title: document.getElementById('editTitle').value,
      timestamp: document.getElementById('editDate').value,
      description: document.getElementById('editDesc').value,
      income: document.getElementById('editIncome').value,
      amount: document.getElementById('editAmount').value
    };
    this.props.updateItem(this.props.index, newObj);
  }

  render() {
    return (
      <tr key={this.props.id}>
        <td><textarea id="editTitle">{this.props.item.title}</textarea></td>
        <td><textarea id="editDate">{this.props.item.timestamp}</textarea></td>
        <td><textarea id="editDesc">{this.props.item.description}</textarea></td>
        <td><textarea id="editIncome">{this.props.item.income}</textarea></td>
        <td><textarea id="editAmount">{this.props.item.amount}</textarea></td>
        <td><button
          onClick={this.edit}>Update</button></td>
        <td><button
          onClick={() => this.props.deleteItem(this.props.id, this.props.index)}>Delete</button></td>
      </tr>
    );

  }

}

export default EditExpense;