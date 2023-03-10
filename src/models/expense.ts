

interface IExpenseItem {
       id: number,
       date: Date,
       expenseDescription: String,
       payeeName: String,
       price: number
}
type IExpenseCreateItem = Omit<IExpenseItem, "id">;

export default IExpenseItem;
export type {IExpenseCreateItem}