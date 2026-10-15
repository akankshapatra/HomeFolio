use homefolio_db;

-- Aggregate total spending per category filtered by HAVING > 5000
select 
    c.category_name,
    count(t.transaction_id) as total_transactions,
    sum(t.amount) as total_expenditure,
    round(avg(t.amount), 2) as average_ticket_size
from financial_transaction t
join category c on t.category_id = c.category_id
where t.transaction_type = 'Debit'
group by c.category_id, c.category_name
having sum(t.amount) > 5000.00
order by total_expenditure desc;