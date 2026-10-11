import { createFileRoute } from '@tanstack/react-router';
import { FinancePage } from '@/features/homefolio/Pages';
export const Route=createFileRoute('/bills')({head:()=>({meta:[{title:'Bill Reminders — HomeFolio'},{name:'description',content:'Manage your household bill reminders securely in HomeFolio.'},{property:'og:title',content:'Bill Reminders — HomeFolio'},{property:'og:description',content:'A shared view of your family bill reminders.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Page});
function Page(){return <FinancePage page="bills"/>}
