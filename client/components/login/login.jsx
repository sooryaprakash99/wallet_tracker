
import React from 'react';
import ReactDOM from 'react-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Home from '../home/Home';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e) {

        e.preventDefault();

        const { username, password } = this.state;
        axios.post('/login', {
            username: username,
            password: password
        })
            .then(function (response) {
                localStorage.setItem('isLoggedIn', true);
                ReactDOM.render(<Home />, document.getElementById('app'));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {

        return (
            <div>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="email" placeholder="Enter Username"
                            label="Username"
                            name="username"
                            onChange={this.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" label="Password"
                            name="password" onChange={this.handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                </Form>

            </div>
        );
    }
}

export default Login;