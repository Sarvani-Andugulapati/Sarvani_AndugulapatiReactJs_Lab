import { format } from "date-fns";
import { Table } from "react-bootstrap"
import IExpenseItem from "../models/expense"

type ExpenseItemsModel = {

    expenseItems : IExpenseItem[];

}

const   ExpenseItems = ({expenseItems}: ExpenseItemsModel) => {

    const convertDate = (date:Date) => {
        return format(new Date(date),"yyyy-MM-dd");
    }
    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Expense Description</th>
                        <th>date</th>
                        <th>Payee</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        expenseItems.map((expenseItem: IExpenseItem, index) => {

                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{expenseItem.expenseDescription}</td>
                                    <td>{convertDate(expenseItem.date)}</td>
                                    <td>{expenseItem.payeeName}</td>
                                    <td>{expenseItem.price}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>

        </div>
    )
}

export { ExpenseItems }