
import React from 'react';
import ReactDOM from 'react-dom';
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
        if (document.getElementById('title').value != null &&
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

            axios.post('/expenses', expenseObj)
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

        axios.put(`/expenses/${obj.id}`, obj)
            .then((response) => {
                this.state.expensesList[idx] = response.data;
                this.setState({
                    expensesList: this.state.expensesList
                });
            }).catch((err) => {
                if (err)
                    console.log(err);
            });
    }

    deleteItem(id, idx) {
        axios.delete(`/expenses/${id}`)
            .then((response) => {
                this.state.expensesList.splice(idx, 1);
                this.setState({
                    expensesList: this.state.expensesList
                });
            }).catch((err) => {
                if (err)
                    console.log(err);
            });
    }

    logout() {
        localStorage.removeItem('isLoggedIn');
        location.reload();
    }

    componentDidMount() {
        axios.get('/expenses')
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
            <button onClick={this.logout}>Logout</button>
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
                        <td><input type='date' id="date" placeholder='YYYY-MM-DD' pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"></input></td>
                        <td><input type="text" id="desc" placeHolder="Enter the Desc"></input></td>
                        <td>
                            <select id="income">
                                <option value="income">income</option>
                                <option value="expense">expense</option>
                            </select>
                        </td>
                        <td><input type="number" id="amount" placeHolder="Enter the Amount"></input></td>
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