import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { demo, type FinanceState } from './data';
import { loadFinance, saveFinance, createHousehold } from './finance.functions';
import { useServerFn } from '@tanstack/react-start';
const FinanceContext=createContext<ReturnType<typeof useFinanceStore>|null>(null);
function useFinanceStore(){
 const [state,setState]=useState<FinanceState>(demo); const [theme,setTheme]=useState('dark'); const [month,setMonth]=useState('2026-10');
 const [transactionOpen,setTransactionOpen]=useState(false); const [user,setUser]=useState<string|null>(null); const [familyId,setFamilyId]=useState<string|null>(null); const [loading,setLoading]=useState(false); const [role,setRole]=useState('Owner'); const [error,setError]=useState('');
 const load=useServerFn(loadFinance); const save=useServerFn(saveFinance); const create=useServerFn(createHousehold);
 useEffect(()=>{const preference=localStorage.getItem('homefolio-theme');if(preference==='light')setTheme('light');},[]);
 useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('homefolio-theme',theme)},[theme]);
 useEffect(()=>{let active=true;async function hydrate(){const {data}=await supabase.auth.getUser();if(!active)return;setUser(data.user?.email??null);if(!data.user){setFamilyId(null);setState(demo);return;}setLoading(true);try{const result=await load();if(active&&result){setFamilyId(result.familyId);setRole(result.role);setState(result.state as FinanceState)}}catch(e){setError(e instanceof Error?e.message:'Unable to load household')}finally{setLoading(false)}}void hydrate();const {data:{subscription}}=supabase.auth.onAuthStateChange(event=>{if(event==='SIGNED_IN'||event==='SIGNED_OUT'||event==='USER_UPDATED')void hydrate()});return()=>{active=false;subscription.unsubscribe()}},[load]);
 async function mutate(action:string,detail:string,change:(s:FinanceState)=>FinanceState){
 const updated=change(state);const next={...updated,audit:[{id:crypto.randomUUID(),action,detail,date:new Date().toISOString(),member:'Arjun'},...state.audit]};
 if(familyId){setLoading(true);try{await save({data:{familyId,state:next}});setState(next);toast.success(action)}catch(e){toast.error(e instanceof Error?e.message:'Could not save changes')}finally{setLoading(false)}}else{setState(next);toast.success(`${action} · demo mode`)}
 }
 async function startHousehold(){setLoading(true);try{const id=await create();setFamilyId(id);setState({...demo,transactions:[],audit:[],accounts:[],bills:[],splits:[],goals:[]});toast.success('Your private household is ready')}catch(e){toast.error(e instanceof Error?e.message:'Could not create household')}finally{setLoading(false)}}
 return {state,theme,setTheme,month,setMonth,transactionOpen,setTransactionOpen,mutate,user,familyId,loading,role,error,setError,startHousehold};
}
export function FinanceProvider({children}:{children:ReactNode}){const value=useFinanceStore();return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>}
export function useFinance(){const value=useContext(FinanceContext);if(!value)throw new Error('Finance provider missing');return value;}
