import { FormEvent, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import IExpenseItem, { IExpenseCreateItem } from "../models/expense";
import { getUniquePayeeNames } from "../services/expene-utils";
import { postExpenseItems } from "../services/expense";


type ExpenseCreaterModel = {

    expenseItems: IExpenseItem[]
    refresh : (newCreatedItem : IExpenseItem) => void;
}

const ExpenseCreater = ({ expenseItems, refresh }: ExpenseCreaterModel) => {

    const expenseDescriptionRef = useRef<HTMLInputElement>(null);

    const payeeNameRef = useRef<HTMLSelectElement>(null);

    const priceRef = useRef<HTMLInputElement>(null);

    const dateRef = useRef<HTMLInputElement>(null);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const uniquepayeename = getUniquePayeeNames(expenseItems);

    const handleAddExpenseItem = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const expenseDecription = (expenseDescriptionRef?.current?.value as string);
        const payee = (payeeNameRef?.current?.value as string);
        const price = parseFloat((priceRef?.current?.value as string));
        const date = new Date((dateRef?.current?.value as string));

        const newExpenseItem: IExpenseCreateItem = {

            date: date,
            expenseDescription: expenseDecription,
            payeeName: payee,
            price: price
        }
        const newCreatedItem = await postExpenseItems(newExpenseItem);
        handleClose();
        console.log(newCreatedItem);

        refresh(newCreatedItem);

    }

    return (
        <>
            <Button variant="primary" className="float-end" onClick={handleShow}>
                Create New Expense
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleAddExpenseItem}>

                        <Form.Group className="mb-3" controlId="formBasicText">
                            <Form.Text className="text-muted">
                                <p style={{ color: "red" }}>Read the below instruction before proceding:</p>
                                <p>Make sure you fill all the fields where * is provided </p>
                            </Form.Text>

                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicDate">
                            <Form.Label>date<span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control type="date" required ref={dateRef} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicExpense">
                            <Form.Label>Expense Description<span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control type="text" placeholder="Enter Expense Description" required ref={expenseDescriptionRef} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Payee Name<span style={{ color: "red" }}>*</span></Form.Label>

                            <Form.Select aria-label="Default select example" required ref={payeeNameRef}>

                                <option>Select Payee</option>
                                {
                                    uniquepayeename.map((payeeName) => {
                                        return (
                                            <option value={payeeName}>{payeeName}</option>
                                        )
                                    })
                                }

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPrice">
                            <Form.Label>Price<span style={{ color: "red" }}>*</span></Form.Label>
                            <Form.Control type="number" placeholder="Enter paid amount" ref={priceRef} required />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                        <Button variant="secondary" className="float-end" onClick={handleClose}>
                            Close
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
export { ExpenseCreater };        