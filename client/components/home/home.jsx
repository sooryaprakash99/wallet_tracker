
import React from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expensesList: [],
            selectedExpense: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8080/expenses')
            .then((response) => {
                this.setState({ expensesList: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
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
                                <td>{expense.id}</td>
                                <td>{expense.date}</td>
                                <td>{expense.description}</td>
                                <td>{expense.type}</td>
                                <td>{expense.amount}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        );
    }
}

export default Home;