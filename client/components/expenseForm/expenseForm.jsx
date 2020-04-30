import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import axios from 'axios';


class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);

        const { expense = {} } = props;
        this.state = { expense };

        this.handleChange = this.handleChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        const { expense } = nextProps;
        this.setState({ expense });
    }


    handleSubmit(e) {
        e.preventDefault();
        const { expense } = this.state;
        const { handleSubmit } = this.props;

        handleSubmit(expense);

        this.setState({ expense: {} });
    }

    handleDateChange(value, formattedValue) {
        this.setState({ 'timestamp': formattedValue });
    }

    handleChange(e) {
        const { expense } = this.state;
        this.setState({ expense: { ...expense, [e.target.name]: e.target.value } });
    }

    render() {

        const { expense: { title, description, type, timestamp, amount } } = this.state;
        const { handleCancel, submitText = 'Create' } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Group     >
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        placeholder="title"
                        name="title"
                        value={title}
                        onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows="1"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Control as="select" name="type" value={type} onChange={this.handleChange}>
                        <option>income</option>
                        <option>paid</option>
                    </Form.Control>
                </Form.Group>
                {/* <Form.Group>
                        <Form.Label>Date</Form.Label>
                        <DatePicker id="datepicker"
                            value={this.state.value}
                            onChange={this.handleDateChange}
                            dateFormat='DD-MM-YYYY' />
                    </Form.Group> */}

                <Form.Group     >
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                        placeholder="amount"
                        name="amount"
                        value={amount}
                        onChange={this.handleChange} />
                </Form.Group>
                <Form.Group>
                    <Button type="submit">{submitText}</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </Form.Group>
            </Form>
        );
    }

}

export default ExpenseForm;