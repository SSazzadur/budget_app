import React, { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetsContext";

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();

  const { addExpense, budgets } = useBudgets();

  const handleSubmit = e => {
    e.preventDefault();

    addExpense(
      descriptionRef.current.value,
      parseFloat(amountRef.current.value),
      budgetIdRef.current.value
    );

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={descriptionRef} type="text" required autoComplete="off" />
          </Form.Group>
          <Form.Group controlId="amount" className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              ref={amountRef}
              type="number"
              min={0}
              step={0.01}
              required
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group controlId="budgetId" className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORIZED_BUDGET_ID}>Uncategorized</option>
              {budgets.map(budget => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddExpenseModal;
