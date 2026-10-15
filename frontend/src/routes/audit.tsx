import { createFileRoute } from '@tanstack/react-router';
import { FinancePage } from '@/features/homefolio/Pages';
export const Route=createFileRoute('/audit')({head:()=>({meta:[{title:'Audit Logs — HomeFolio'},{name:'description',content:'Manage your household audit logs securely in HomeFolio.'},{property:'og:title',content:'Audit Logs — HomeFolio'},{property:'og:description',content:'A shared view of your family audit logs.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Page});
function Page(){return <FinancePage page="audit"/>}
