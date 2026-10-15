use homefolio_db;

create or replace view vw_family_liquidity as
select 
    f.family_id,
    f.family_name,
    count(a.account_id) as total_active_accounts,
    coalesce(sum(case when a.account_type != 'Credit Card' then a.current_balance else 0 end), 0.00) as liquid_cash_balance,
    coalesce(sum(case when a.account_type = 'Credit Card' then a.current_balance else 0 end), 0.00) as credit_card_outstanding,
    coalesce(sum(a.current_balance), 0.00) as net_family_worth
from family f
left join account a on f.family_id = a.family_id
group by f.family_id, f.family_name;