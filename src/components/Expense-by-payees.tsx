import { Table } from "react-bootstrap";
import IExpenseItem from "../models/expense";
import { getGrandTotal, getTotalContributedAmt, getUniquePayeeNames } from "../services/expene-utils";

type ExpenseByPayeesModel = {
    expenseItems: IExpenseItem[];
}

const ExpenseByPayees = ({ expenseItems }: ExpenseByPayeesModel) => {

    const uniquePayeeNames = getUniquePayeeNames(expenseItems);
   
    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Payee Name</th>
                        <th>Contributed Amount</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        uniquePayeeNames.map((payeeName, index) => {

                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{payeeName}</td>
                                    <td>{getTotalContributedAmt(payeeName,expenseItems)}</td>
                                </tr>
                            )
                        })
                    }
                    <tr>
                        <td></td>
                        <td>GRAND TOTAL</td>
                        <td>{getGrandTotal(expenseItems)}</td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
}
export { ExpenseByPayees }