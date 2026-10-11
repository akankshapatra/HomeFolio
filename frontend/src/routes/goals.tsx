import { createFileRoute } from '@tanstack/react-router';
import { FinancePage } from '@/features/homefolio/Pages';
export const Route=createFileRoute('/goals')({head:()=>({meta:[{title:'Savings Goals — HomeFolio'},{name:'description',content:'Manage your household savings goals securely in HomeFolio.'},{property:'og:title',content:'Savings Goals — HomeFolio'},{property:'og:description',content:'A shared view of your family savings goals.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Page});
function Page(){return <FinancePage page="goals"/>}
