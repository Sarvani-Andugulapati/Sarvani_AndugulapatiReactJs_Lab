import { getAllexpenseItems } from "../services/expense"
import { useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import { ExpenseItems } from "./Expense-items"
import IExpenseItem from "../models/expense"
import { ExpenseByPayees } from "./Expense-by-payees"
import { ExpenseByPendingAmount } from "./Expense-by-pending-Amount"
import { ExpenseCreater } from "./expense-creater"

const ExpenseTracker = () => {

        const [expenseItems, setExpenseItem] = useState<IExpenseItem[]>([]) 

        useEffect(() => {
        const getExpenseInvoker = async() =>{
            try {
                const response = await getAllexpenseItems();
                console.log(response);
                setExpenseItem(response);
            } catch (error) {
                console.log(error);
            }
        }
        getExpenseInvoker();
    }, [])

    const refreshParent = (newCreatedItem : IExpenseItem) =>{

        setExpenseItem(
            [
                newCreatedItem,
                ...expenseItems
            ]
        )

    }

    return (
       <Container>
        <h2>Expense Items
            <ExpenseCreater expenseItems = {expenseItems} refresh = {refreshParent}></ExpenseCreater>
        </h2>
       <ExpenseItems expenseItems ={expenseItems}></ExpenseItems>
       <ExpenseByPayees expenseItems={expenseItems}></ExpenseByPayees>
       <ExpenseByPendingAmount expenseItems={expenseItems}></ExpenseByPendingAmount>
       </Container>
    )
}       

export { ExpenseTracker }