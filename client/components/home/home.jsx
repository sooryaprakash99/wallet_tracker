
import React from 'react';
import axios from 'axios';
import ListExpenses from '../list/listExpenses';
import EditExpense from '../editList/EditExpense';

class Home
    extends React.Component {
    constructor(props) {
        super(props);

        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.logout = this.logout.bind(this);

        this.state = {
            expensesList: []
        }

    }

    addItem() {
        if (document.getElementById('date').value != null &&
            document.getElementById('date').value != null &&
            document.getElementById('desc').value != null &&
            document.getElementById('income').value != null &&
            document.getElementById('amount').value != null) {

            var expenseObj = {
                title: document.getElementById('title').value,
                timestamp: document.getElementById('date').value,
                description: document.getElementById('desc').value,
                income: document.getElementById('income').value,
                amount: document.getElementById('amount').value
            };

            axios.post('http://localhost:3000/expenses', expenseObj)
                .then((response) => {
                    this.setState(state => {
                        const expensesList = [...state.expensesList, response.data];
                        return {
                            expensesList
                        };
                    }, () => {
                        document.getElementById('title').value = "";
                        document.getElementById('date').value = "";
                        document.getElementById('desc').value = "";
                        document.getElementById('income').value = "";
                        document.getElementById('amount').value = "";
                    });
                }).catch((error) => {
                    if (error)
                        console.log(error);
                });
        }
    }

    editItem(idx) {
        console.log(this.state.expensesList[idx]);
        this.state.expensesList[idx].isEdit = true;
        this.setState({
            expensesList: this.state.expensesList
        });
        console.log(this.state.expensesList);
    }

    updateItem(idx, obj) {
        this.state.expensesList[idx].isEdit = false;
        this.state.expensesList[idx] = {};
        this.state.expensesList[idx] = obj;

        axios.put(`http://localhost:3000/expenses/${obj.id}`, obj)
            .then((response) => {
                this.state.expensesList[idx] = response.data;
                this.setState({
                    expensesList: this.state.expensesList
                });
            }).catch((err) => {
                if (error)
                    console.log(error);
            });
    }

    deleteItem(id, idx) {
        axios.delete(`http://localhost:3000/expenses/${id}`)
            .then((response) => {
                this.state.expensesList.splice(idx, 1);
                this.setState({
                    expensesList: this.state.expensesList
                });
            }).catch((err) => {
                if (error)
                    console.log(error);
            });
    }

    logout() {
        localStorage.removeItem('isLoggedIn')
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


    render() {
        return (<div>
            <h1>Wallet Tracker</h1>
            <button onClick="logout()">Logout</button>
            <table>
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>Date</td>
                        <td>Description</td>
                        <td>Income/Expense</td>
                        <td>Amount</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" id="title" placeHolder="Enter the title"></input></td>
                        <td><input type="text" id="date" placeHolder="Enter the date"></input></td>
                        <td><input type="text" id="desc" placeHolder="Enter the Desc"></input></td>
                        <td><input type="text" id="income" placeHolder="Enter the Income"></input></td>
                        <td><input type="text" id="amount" placeHolder="Enter the Amount"></input></td>
                        <td><button onClick={this.addItem}>Add</button></td>
                    </tr>
                    {this.state.expensesList.map((item, index) => {
                        return (item.isEdit ?
                            (
                                <EditExpense index={index} id={item.id} item={item} updateItem={this.updateItem} deleteItem={this.deleteItem} />)
                            : (
                                <ListExpenses index={index} id={item.id} item={item} editItem={this.editItem} deleteItem={this.deleteItem} />))
                    })}
                </tbody>
            </table>

        </div>)
    }
}

export default Home;