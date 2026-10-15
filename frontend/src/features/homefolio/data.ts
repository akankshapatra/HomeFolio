export const currency = (n:number) => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
export const shortDate = (d:string) => new Date(d+'T12:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short'});
export type Transaction = {id:string; date:string; description:string; member:string; account:string; category:string; amount:number; type:'income'|'expense'; notes?:string};
export type Account = {id:string; name:string; kind:string; masked:string; balance:number};
export type Budget = {name:string; limit:number};
export type Goal = {id:string; name:string; saved:number; target:number; due:string};
export type Bill = {id:string; name:string; amount:number; due:string; paid:boolean; category:string};
export type Split = {id:string; description:string; from:string; to:string; amount:number; settled:boolean; date:string};
export type Audit = {id:string; action:string; detail:string; date:string; member:string};
export type FinanceState = {transactions:Transaction[]; accounts:Account[]; budgets:Budget[]; goals:Goal[]; bills:Bill[]; splits:Split[]; audit:Audit[]};
export const members = ['Arjun','Priya','Riya'];
export const demo:FinanceState = {
 accounts:[{id:'hdfc',name:'HDFC Savings',kind:'Savings account',masked:'•••• 4821',balance:195000},{id:'sbi',name:'SBI Credit Card',kind:'Credit card',masked:'•••• 9016',balance:-18500},{id:'cash',name:'Cash Reserve',kind:'Cash wallet',masked:'Household cash',balance:30000}],
 budgets:[{name:'Groceries',limit:12000},{name:'Utilities',limit:6000},{name:'Rent',limit:20000},{name:'Transport',limit:5000},{name:'Dining',limit:4000},{name:'Healthcare',limit:3000}],
 transactions:[
 {id:'t1',date:'2026-10-11',description:'BigBasket groceries',member:'Priya',account:'HDFC Savings',category:'Groceries',amount:2450,type:'expense'},
 {id:'t2',date:'2026-10-10',description:'Monthly salary',member:'Arjun',account:'HDFC Savings',category:'Salary',amount:85000,type:'income'},
 {id:'t3',date:'2026-10-10',description:'Electricity bill',member:'Arjun',account:'HDFC Savings',category:'Utilities',amount:1850,type:'expense'},
 {id:'t4',date:'2026-10-09',description:'Family dinner · The Table',member:'Priya',account:'SBI Credit Card',category:'Dining',amount:1850,type:'expense'},
 {id:'t5',date:'2026-10-09',description:'Uber · office commute',member:'Arjun',account:'SBI Credit Card',category:'Transport',amount:350,type:'expense'},
 {id:'t6',date:'2026-10-08',description:'Apollo pharmacy',member:'Priya',account:'HDFC Savings',category:'Healthcare',amount:650,type:'expense'},
 {id:'t7',date:'2026-10-07',description:'Weekly groceries',member:'Priya',account:'HDFC Savings',category:'Groceries',amount:4190,type:'expense'},
 {id:'t8',date:'2026-10-06',description:'Internet & mobile',member:'Arjun',account:'HDFC Savings',category:'Utilities',amount:2590,type:'expense'},
 {id:'t9',date:'2026-10-05',description:'Dining & coffee',member:'Riya',account:'Cash Reserve',category:'Dining',amount:2470,type:'expense'},
 {id:'t10',date:'2026-10-04',description:'Fuel & metro recharge',member:'Arjun',account:'HDFC Savings',category:'Transport',amount:2800,type:'expense'},
 {id:'t11',date:'2026-10-03',description:'Family medical checkup',member:'Priya',account:'HDFC Savings',category:'Healthcare',amount:550,type:'expense'},
 {id:'t12',date:'2026-10-02',description:'October rent · partial payment',member:'Arjun',account:'HDFC Savings',category:'Rent',amount:12000,type:'expense'},
 {id:'t13',date:'2026-10-01',description:'Freelance design project',member:'Priya',account:'HDFC Savings',category:'Salary',amount:40000,type:'income'},
 {id:'t14',date:'2026-10-01',description:'Fresh market',member:'Priya',account:'Cash Reserve',category:'Groceries',amount:2970,type:'expense'},
 {id:'s1',date:'2026-09-28',description:'September salary',member:'Arjun',account:'HDFC Savings',category:'Salary',amount:115000,type:'income'},
 {id:'s2',date:'2026-09-24',description:'September rent',member:'Arjun',account:'HDFC Savings',category:'Rent',amount:20000,type:'expense'},
 {id:'s3',date:'2026-09-21',description:'September groceries',member:'Priya',account:'HDFC Savings',category:'Groceries',amount:10800,type:'expense'},
 {id:'s4',date:'2026-09-18',description:'September utilities',member:'Arjun',account:'HDFC Savings',category:'Utilities',amount:4800,type:'expense'}],
 goals:[{id:'vacation',name:'Annual Family Vacation',saved:25000,target:200000,due:'2027-06-01'},{id:'emergency',name:'Emergency Fund',saved:65000,target:300000,due:'2027-12-01'}],
 bills:[{id:'b1',name:'Airtel broadband',amount:999,due:'2026-10-14',paid:false,category:'Utilities'},{id:'b2',name:'SBI credit card',amount:18500,due:'2026-10-18',paid:false,category:'Credit repayment'},{id:'b3',name:'Netflix Premium',amount:649,due:'2026-10-20',paid:false,category:'Entertainment'}],
 splits:[{id:'sp1',description:'Weekend getaway',from:'Priya',to:'Arjun',amount:3200,settled:false,date:'2026-10-08'},{id:'sp2',description:'Family dinner',from:'Arjun',to:'Priya',amount:1850,settled:false,date:'2026-10-09'},{id:'sp3',description:'Movie night',from:'Riya',to:'Priya',amount:800,settled:false,date:'2026-10-06'}],
 audit:[{id:'a1',action:'Transaction logged',detail:'BigBasket groceries · ₹2,450',date:'2026-10-11T09:30:00',member:'Priya'},{id:'a2',action:'Budget updated',detail:'Groceries monthly limit set to ₹12,000',date:'2026-10-10T15:10:00',member:'Arjun'}]
};
export function totals(transactions:Transaction[],month:string){const rows=transactions.filter(t=>t.date.startsWith(month));return {income:rows.filter(t=>t.type==='income').reduce((a,t)=>a+t.amount,0),expenses:rows.filter(t=>t.type==='expense').reduce((a,t)=>a+t.amount,0)}}
export function budgetData(state:FinanceState,month:string){return state.budgets.map(b=>({...b,actual:state.transactions.filter(t=>t.date.startsWith(month)&&t.type==='expense'&&t.category===b.name).reduce((s,t)=>s+t.amount,0)}))}
export const navItems = [{name:'Overview',path:'/'},{name:'Accounts & Cards',path:'/accounts'},{name:'Category Budgets',path:'/budgets'},{name:'Shared Splits',path:'/splits'},{name:'Savings Goals',path:'/goals'},{name:'Bill Reminders',path:'/bills'},{name:'Audit Logs',path:'/audit'}] as const;
