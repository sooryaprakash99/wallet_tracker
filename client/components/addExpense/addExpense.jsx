import React from 'react';
import axios from 'axios';
import ExpenseForm from '../expenseForm/ExpenseForm';
import { Container, Row } from 'react-bootstrap';

class AddExpense extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleSubmit(expense) {
        axios.post('http://localhost:3000/expenses', expense)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleCancel(e) {
        e.preventDefault();
    }

    render() {
        return (
            <Container>
                <Row>
                    <h2>Add Expense</h2>
                </Row>
                <Container>
                    <ExpenseForm
                        handleSubmit={this.handleSubmit}
                        handleCancel={this.handleCancel}
                    />
                </Container>

            </Container>
        );
    }
}

export default AddExpense;