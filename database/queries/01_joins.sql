use homefolio_db;

-- Multi-table Inner Join: Transaction Audit Ledger
select 
    t.transaction_id,
    t.transaction_date,
    m.full_name as spent_by,
    a.account_name,
    c.category_name,
    t.transaction_type,
    t.amount,
    t.description
from financial_transaction t
inner join family_member m on t.logged_by_member_id = m.member_id
inner join account a on t.account_id = a.account_id
inner join category c on t.category_id = c.category_id
order by t.transaction_date desc;

-- Anti-Join: Expense Categories with zero transactions logged
select 
    c.category_id,
    c.category_name
from category c
left join financial_transaction t 
    on c.category_id = t.category_id 
    and month(t.transaction_date) = 10 
    and year(t.transaction_date) = 2026
where t.transaction_id is null and c.type = 'Expense';