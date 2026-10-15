-- database/schema/01_tables.sql
use homefolio_db;

-- 1. Family Workspace
create table family (
    family_id int primary key auto_increment,
    family_name varchar(100) not null,
    created_at timestamp default current_timestamp
);

-- 2. Household Members (Role-based access)
create table family_member (
    member_id int primary key auto_increment,
    family_id int not null,
    full_name varchar(100) not null,
    email varchar(100) not null unique,
    phone varchar(20) not null,
    role varchar(20) not null check (role in ('Owner', 'Adult', 'Dependent')),
    status varchar(20) not null default 'Active' check (status in ('Active', 'Inactive')),
    joined_at timestamp default current_timestamp,
    foreign key (family_id) references family(family_id) on delete cascade
);

-- 3. Financial Accounts
create table account (
    account_id int primary key auto_increment,
    family_id int not null,
    primary_owner_id int not null,
    account_number varchar(34) not null unique,
    account_name varchar(100) not null,
    account_type varchar(30) not null check (account_type in ('Savings', 'Current', 'Credit Card', 'Cash Wallet')),
    current_balance decimal(12,2) not null default 0.00,
    currency varchar(3) not null default 'INR',
    updated_at timestamp default current_timestamp on update current_timestamp,
    foreign key (family_id) references family(family_id) on delete cascade,
    foreign key (primary_owner_id) references family_member(member_id) on delete cascade
);

-- 4. Transaction Categories
create table category (
    category_id int primary key auto_increment,
    family_id int null,
    category_name varchar(50) not null,
    type varchar(20) not null check (type in ('Income', 'Expense', 'Transfer')),
    foreign key (family_id) references family(family_id) on delete cascade
);

-- 5. Financial Transactions
create table financial_transaction (
    transaction_id int primary key auto_increment,
    account_id int not null,
    category_id int not null,
    logged_by_member_id int not null,
    amount decimal(12,2) not null check (amount > 0),
    transaction_type varchar(10) not null check (transaction_type in ('Debit', 'Credit')),
    description varchar(255) null,
    transaction_date date not null,
    created_at timestamp default current_timestamp,
    foreign key (account_id) references account(account_id) on delete cascade,
    foreign key (category_id) references category(category_id) on delete restrict,
    foreign key (logged_by_member_id) references family_member(member_id) on delete cascade
);

-- 6. Monthly Budgets (Weak Entity on Family & Category)
create table budget (
    budget_id int primary key auto_increment,
    family_id int not null,
    category_id int not null,
    allocated_amount decimal(12,2) not null check (allocated_amount > 0),
    budget_month int not null check (budget_month between 1 and 12),
    budget_year int not null check (budget_year >= 2024),
    unique key uq_family_cat_period (family_id, category_id, budget_month, budget_year),
    foreign key (family_id) references family(family_id) on delete cascade,
    foreign key (category_id) references category(category_id) on delete cascade
);

-- 7. Savings Goals
create table savings_goal (
    goal_id int primary key auto_increment,
    family_id int not null,
    goal_name varchar(100) not null,
    target_amount decimal(12,2) not null check (target_amount > 0),
    current_saved_amount decimal(12,2) not null default 0.00 check (current_saved_amount >= 0),
    target_date date not null,
    status varchar(20) not null default 'In_Progress' check (status in ('In_Progress', 'Achieved', 'Abandoned')),
    foreign key (family_id) references family(family_id) on delete cascade
);

-- 8. Goal Contributions
create table goal_contribution (
    contribution_id int primary key auto_increment,
    goal_id int not null,
    account_id int not null,
    member_id int not null,
    amount decimal(12,2) not null check (amount > 0),
    contribution_date timestamp default current_timestamp,
    foreign key (goal_id) references savings_goal(goal_id) on delete cascade,
    foreign key (account_id) references account(account_id) on delete cascade,
    foreign key (member_id) references family_member(member_id) on delete cascade
);

-- 9. Recurring Bills
create table bill_subscription (
    bill_id int primary key auto_increment,
    family_id int not null,
    category_id int not null,
    account_id int null,
    biller_name varchar(100) not null,
    expected_amount decimal(10,2) not null check (expected_amount > 0),
    due_day_of_month int not null check (due_day_of_month between 1 and 31),
    is_recurring boolean not null default true,
    status varchar(20) not null default 'Pending' check (status in ('Pending', 'Paid', 'Overdue')),
    foreign key (family_id) references family(family_id) on delete cascade,
    foreign key (category_id) references category(category_id) on delete restrict,
    foreign key (account_id) references account(account_id) on delete set null
);

-- 10. Intra-Family Expense Splits
create table expense_split (
    split_id int primary key auto_increment,
    transaction_id int not null,
    owed_by_member_id int not null,
    split_amount decimal(10,2) not null check (split_amount > 0),
    is_settled boolean not null default false,
    settled_at timestamp null,
    foreign key (transaction_id) references financial_transaction(transaction_id) on delete cascade,
    foreign key (owed_by_member_id) references family_member(member_id) on delete cascade
);