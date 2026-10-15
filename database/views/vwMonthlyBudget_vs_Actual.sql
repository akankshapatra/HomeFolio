-- database/views/vw_monthly_budget_vs_actual.sql
use homefolio_db;

create or replace view vw_monthly_budget_vs_actual as
select 
    b.family_id,
    b.budget_year,
    b.budget_month,
    c.category_name,
    b.allocated_amount as budget_limit,
    coalesce(sum(t.amount), 0.00) as actual_spent,
    (b.allocated_amount - coalesce(sum(t.amount), 0.00)) as balance_remaining,
    case 
        when coalesce(sum(t.amount), 0.00) > b.allocated_amount then 'Over Budget'
        when coalesce(sum(t.amount), 0.00) >= (b.allocated_amount * 0.85) then 'Warning (Near Limit)'
        else 'Under Budget'
    end as budget_health
from budget b
join category c on b.category_id = c.category_id
left join financial_transaction t 
    on t.category_id = b.category_id 
    and t.transaction_type = 'Debit'
    and year(t.transaction_date) = b.budget_year 
    and month(t.transaction_date) = b.budget_month
group by b.budget_id, b.family_id, b.budget_year, b.budget_month, c.category_name, b.allocated_amount;