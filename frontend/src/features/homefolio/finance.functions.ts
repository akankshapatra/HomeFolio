import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
import type { FinanceState } from './data';
export const loadFinance=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async({context})=>{
 const {data:members,error}=await context.supabase.from('family_member').select('family_id').eq('user_id',context.userId).limit(1);if(error)throw error;const familyId=members?.[0]?.family_id;if(!familyId)return null;
 const {data,error:readError}=await context.supabase.rpc('read_finance',{p_family:familyId});if(readError)throw readError;return {familyId,state:data?.state,role:data?.role??'Adult'};
});
export const saveFinance=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).inputValidator((input:{familyId:string;state:FinanceState})=>{z.string().uuid().parse(input.familyId);return input}).handler(async({context,data})=>{const {error}=await context.supabase.rpc('save_finance',{p_family:data.familyId,p_state:data.state});if(error)throw new Error(error.message);return true;});
export const createHousehold=createServerFn({method:'POST'}).middleware([requireSupabaseAuth]).handler(async({context})=>{const {data,error}=await context.supabase.rpc('create_household',{p_name:'My Household'});if(error)throw new Error(error.message);return data as string;});
