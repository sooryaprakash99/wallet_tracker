
import React from 'react';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';

class ListExpenses
    extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expensesList: [],
            selectedExpense: ''
        }
        this.editExxpense = this.editExxpense.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:3000/expenses')
            .then((response) => {
                this.setState({ expensesList: response.data });
            })
            .catch((error) => {
                if (error)
                    console.log(error);
            });
    }

    editExxpense(e, expense) {
        console.log(expense)
    }

    render() {
        return (
            <div>
                <h3>Expenses</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Type</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.expensesList.map((expense, index) => {
                            return (
                                <tr key={index}>
                                    <td>{expense.id} <Button onClick="editExpense({expense})"> EDIT</Button></td>
                                    <td>{expense.timestamp}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.type}</td>
                                    <td>{expense.amount}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

        );
    }
}

export default ListExpenses;