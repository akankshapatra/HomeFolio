-- database/triggers/trg_balance_update.sql
USE homefolio_db;

DELIMITER //

CREATE TRIGGER trg_after_transaction_insert
AFTER INSERT ON financial_transaction
FOR EACH ROW
BEGIN
    IF new.transaction_type = 'Debit' THEN
        UPDATE account
        SET current_balance = current_balance - new.amount
        WHERE account_id = new.account_id;
    ELSEIF new.transaction_type = 'Credit' THEN
        UPDATE account
        SET current_balance = current_balance + new.amount
        WHERE account_id = new.account_id;
    END IF;
END //

CREATE TRIGGER trg_after_transaction_delete
AFTER DELETE ON financial_transaction
FOR EACH ROW
BEGIN
    IF old.transaction_type = 'Debit' THEN
        UPDATE account
        SET current_balance = current_balance + old.amount
        WHERE account_id = old.account_id;
    ELSEIF old.transaction_type = 'Credit' THEN
        UPDATE account
        SET current_balance = current_balance - old.amount
        WHERE account_id = old.account_id;
    END IF;
END //

CREATE TRIGGER trg_after_goal_contribution_insert
AFTER INSERT ON goal_contribution
FOR EACH ROW
BEGIN
    UPDATE savings_goal
    SET current_saved_amount = current_saved_amount + new.amount
    WHERE goal_id = new.goal_id;

    UPDATE account
    SET current_balance = current_balance - new.amount
    WHERE account_id = new.account_id;
END //

DELIMITER ;