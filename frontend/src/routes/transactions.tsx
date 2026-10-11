import { createFileRoute } from '@tanstack/react-router';
import { FinancePage } from '@/features/homefolio/Pages';
export const Route=createFileRoute('/transactions')({head:()=>({meta:[{title:'Household Transactions — HomeFolio'},{name:'description',content:'Manage your household household transactions securely in HomeFolio.'},{property:'og:title',content:'Household Transactions — HomeFolio'},{property:'og:description',content:'A shared view of your family household transactions.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Page});
function Page(){return <FinancePage page="transactions"/>}
