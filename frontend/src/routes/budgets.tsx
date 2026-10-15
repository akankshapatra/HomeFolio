import { createFileRoute } from '@tanstack/react-router';
import { FinancePage } from '@/features/homefolio/Pages';
export const Route=createFileRoute('/budgets')({head:()=>({meta:[{title:'Category Budgets — HomeFolio'},{name:'description',content:'Manage your household category budgets securely in HomeFolio.'},{property:'og:title',content:'Category Budgets — HomeFolio'},{property:'og:description',content:'A shared view of your family category budgets.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Page});
function Page(){return <FinancePage page="budgets"/>}
