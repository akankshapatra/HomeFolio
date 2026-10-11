import { createFileRoute } from '@tanstack/react-router';
import { FinancePage } from '@/features/homefolio/Pages';
export const Route=createFileRoute('/splits')({head:()=>({meta:[{title:'Shared Splits — HomeFolio'},{name:'description',content:'Manage your household shared splits securely in HomeFolio.'},{property:'og:title',content:'Shared Splits — HomeFolio'},{property:'og:description',content:'A shared view of your family shared splits.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Page});
function Page(){return <FinancePage page="splits"/>}
