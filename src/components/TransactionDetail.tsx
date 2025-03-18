import React from "react";
import { Link, useParams } from "react-router-dom";
import transactionsData from "../transactions.json";
import { Transaction } from "../types/TransactionTypes";

const TransactionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const transactions = transactionsData.transactions as Transaction[];
    const transaction = transactions.find((t: Transaction) => t.id === Number(id));

    if (!transaction) {
        return <p className="transaction-detail_not-found">Transaction not found.</p>;
    }

    return (
        <div className="transaction-detail">
            <div className="transaction-card">
                <Link to="/" className="transaction-detail-back">&larr; Back</Link>
                <p className="transaction-card-amount">${transaction.amount.toFixed(2)}</p>
                <p className="transaction-card-name">{transaction.name}</p>
                <p className="transaction-card-date">{transaction.date}</p>

                <div className="transaction-status">
                    <p className="transaction-status-text">Status: <span className="transaction-status-approved">Approved</span></p>
                </div>

                <div className="transaction-total">
                    <span>Total</span>
                    <span>${transaction.amount.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};
export default TransactionDetail;
