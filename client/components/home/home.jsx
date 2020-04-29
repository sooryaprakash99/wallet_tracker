
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
        // axios.get('http://localhost:8080/expenses')
        //     .then(function (response) {
        //         this.setState({ expensesList: response });
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }


    render() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>
        );
    }
}

export default Home;