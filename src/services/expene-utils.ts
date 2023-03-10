import IExpenseItem from "../models/expense";

const getUniquePayeeNames = (expenseItems: IExpenseItem[]) => {

    const uniquePayeenames: String[] = [];

    expenseItems.forEach((expenseItem) => {

        let payeeName = expenseItem.payeeName;
        if (!uniquePayeenames.includes(payeeName)) {
            uniquePayeenames.push(payeeName);

        }

    })
    return uniquePayeenames;
}
const getGrandTotal = (expenseItems: IExpenseItem[]) =>{
    let grandTotalAmt = 0;
    expenseItems.forEach((expenseItem) => {

        grandTotalAmt += expenseItem.price;

        }) 
    return grandTotalAmt;
}

const getTotalContributedAmt = (payeeName: String,expenseItems : IExpenseItem[]) => {

    let TotalContributedAmt = 0;

    expenseItems.forEach((expenseItem) => {

        if (expenseItem.payeeName === payeeName) {

            TotalContributedAmt += expenseItem.price;

        }

    })
    return TotalContributedAmt;
}
export{getUniquePayeeNames,getGrandTotal,getTotalContributedAmt}