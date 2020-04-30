import React from 'react';
import axios from 'axios';
import ExpenseForm from '../expenseForm/ExpenseForm'

class EditExpense extends React.Component {
    constructor(props) {
        super(props);

        this.state = { expense: { title: '', description: '', type: '', tmestamp: '', amount: '' } };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { expense } = nextProps;
        this.setState({ expense });
    }


    handleSubmit(expense) {
        axios.post(`http://localhost:3000/expenses/${expense.id}`, expense)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleCancel(e) {
    }

    render() {
        const { expense } = this.state;

        return (
            <div>
                <h2>Edit Expense</h2>
                <UserForm
                    expense={expense}
                    submitText="Update"
                    handleSubmit={this.handleSubmit}
                    handleCancel={this.handleCancel}
                />
            </div>
        );
    }

}