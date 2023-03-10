import { Table } from "react-bootstrap";
import IExpenseItem from "../models/expense";
import { getUniquePayeeNames,getGrandTotal,getTotalContributedAmt } from "../services/expene-utils";

type ExpenseByPendingAmountModel = {
    expenseItems: IExpenseItem[];
}

const ExpenseByPendingAmount = ({ expenseItems }: ExpenseByPendingAmountModel) => {

    const uniquePayeeNames = getUniquePayeeNames(expenseItems);

    const getPendingAmount = (payeeName: String ) =>{

        const totalexpenes = getGrandTotal(expenseItems);
        const totalcontributionByPayee = getTotalContributedAmt(payeeName,expenseItems);
        const numberOfPayees = uniquePayeeNames.length;
        const avgAmountEach = totalexpenes/numberOfPayees;


        if (totalcontributionByPayee >= avgAmountEach) {
            return 0;
        }else{
            return(avgAmountEach - totalcontributionByPayee)
        }   
    }

    return (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Payee {`<=>`} Payee</th>
                        <th>Pending Amount</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        uniquePayeeNames.map((payeeName, index) => {

                            return (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{payeeName}</td>
                                    <td>{getPendingAmount(payeeName)}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table>
        </div>
    );
}
export { ExpenseByPendingAmount }