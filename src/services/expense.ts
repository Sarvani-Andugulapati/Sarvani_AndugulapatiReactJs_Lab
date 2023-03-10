import axios from "axios";
import IExpenseItem, { IExpenseCreateItem } from "../models/expense";
const Get_Expense_Items_Url = "http://localhost:4000/items";
const POST_EXPENSE_ITEMS_URL ="http://localhost:4000/items"
const getAllexpenseItems = async () =>{

    const response = 
         await axios.get<IExpenseItem[]>( Get_Expense_Items_Url );

    return response.data;
}
const postExpenseItems = async (newExpenseItem : IExpenseCreateItem) =>{

    const response =   await axios.post( POST_EXPENSE_ITEMS_URL, newExpenseItem, {
            headers:{
                'Content-Type': 'Application/json'
            }
         } );   
         return response.data;
}


export {getAllexpenseItems,postExpenseItems}