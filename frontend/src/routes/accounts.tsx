import { createFileRoute } from '@tanstack/react-router';
import { FinancePage } from '@/features/homefolio/Pages';
export const Route=createFileRoute('/accounts')({head:()=>({meta:[{title:'Accounts & Cards — HomeFolio'},{name:'description',content:'Manage your household accounts & cards securely in HomeFolio.'},{property:'og:title',content:'Accounts & Cards — HomeFolio'},{property:'og:description',content:'A shared view of your family accounts & cards.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Page});
function Page(){return <FinancePage page="accounts"/>}
