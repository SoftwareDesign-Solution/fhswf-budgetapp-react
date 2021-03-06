import React from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {Budget} from "../models/Budget";
import {Expense} from "../models/Expense";
import { v4 as uuidv4 } from 'uuid';

type AddExpenseModalProps = {

    // Parameter
    show: boolean;
    budget?: Budget;
    budgets: Budget[];

    // Events
    onClose: () => void;
    onExpenseSave: (expense: Expense) => void;

}

type AddExpenseModalState = {
    name: string;
    amount: number;
    budgetId: string;
}

export default class AddExpenseModal extends React.Component<AddExpenseModalProps, AddExpenseModalState> {

    state: AddExpenseModalState = {
        name: '',
        amount: 0,
        budgetId: ''
    };

    constructor(props: any) {

        super(props);

        // Methoden registrieren
        /*
        this.onModalClose = this.onModalClose.bind(this);
        this.onNameChanged = this.onNameChanged.bind(this);
        this.onAmountChanged = this.onAmountChanged.bind(this);
        this.onBudgetChanged = this.onBudgetChanged.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        */

    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps: Readonly<AddExpenseModalProps>, prevState: Readonly<AddExpenseModalState>, snapshot?: any) {
    }

    componentWillUnmount() {
    }

    onModalClose = () => {
        this.props.onClose();
    }

    onNameChanged = (e: any) => this.setState({name: e.target.value});

    onAmountChanged = (e: any) => this.setState({amount: e.target.value});

    onBudgetChanged = (e: any) => this.setState({budgetId: e.target.value});

    onCancelClick = () => {
        this.props.onClose();
    };

    onSaveClick = () => {

        let budgetId: string = '';

        if (this.state.budgetId !== '')
            budgetId = this.state.budgetId;
        else if (this.props.budget?.id !== '')
            budgetId = this.props.budget?.id || '';

        const expense: Expense = {
            id: uuidv4(),
            budgetId: budgetId,
            name: this.state.name,
            amount: this.state.amount
        };

        this.props.onExpenseSave(expense);
        this.props.onClose();

    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.onModalClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Kosten hinzuf??gen</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form>

                        <Form.Group className="mb-3" controlId="input-1">
                            <Form.Text>Name</Form.Text>
                            <Form.Control type="text" onChange={this.onNameChanged} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="input-2">
                            <Form.Text>Betrag</Form.Text>
                            <Form.Control type="number" onChange={this.onAmountChanged} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="input-3">
                            <Form.Text>Budget</Form.Text>
                            <Form.Select defaultValue={this.props.budget != null ? this.props.budget.id : ''} onChange={this.onBudgetChanged}>
                                {this.props.budgets.map(item => {
                                    return (
                                        <option key={item.id} value={item.id}>{item.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>

                    </form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" type="submit" onClick={this.onCancelClick}>Abbrechen</Button>
                    <Button variant="primary" type="submit" onClick={this.onSaveClick}>Speichern</Button>
                </Modal.Footer>

            </Modal>
        );
    }

}