import React, { useState, useEffect } from "react";
import transactionsData from "../transactions.json";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import { Transaction } from "../types/TransactionTypes";

const TransactionList: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const navigate = useNavigate();
    const maxLimit = 1500;
    const cardBalance = Math.random() * maxLimit;
    const availableBalance = maxLimit - cardBalance;

    useEffect(() => {
        setTransactions(transactionsData.transactions as Transaction[]);
    }, []);

    const formatTransactionDate = (date: string): string => {
        const transactionDate = new Date(date);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - transactionDate.getTime());
        const diffDays = Math.floor(diffTime / (1000 * 3600 * 24));

        if (diffDays <= 7) {
            return format(transactionDate, "EEEE");
        } else {
            return format(transactionDate, "yyyy-MM-dd");
        }
    };

    return (
        <div className="wallet-container">
            <div className="card-info">
                <div className="card">
                    <h3>Card Balance</h3>
                    <p className="balance">${cardBalance.toFixed(2)}</p>
                    <span className="sub-text">${availableBalance.toFixed(2)} Available</span>
                </div>

                <div className="card no-payment">
                    <h3>No Payment Due</h3>
                    <p className="sub-text">You've paid your September balance.</p>
                    <div className="check-icon">✔</div>
                </div>

                <div className="card full-width">
                    <h3>Daily Points</h3>
                    <p className="points">456K</p>
                </div>
            </div>

                <h2>Latest Transactions</h2>
                <ul className="transaction-list">
                    {Array.isArray(transactions) && transactions.length > 0 ? (
                        transactions.map((txn) => (
                            <li key={txn.id} className="transaction-item" onClick={() => navigate(`/transaction/${txn.id}`)} >
                                <FontAwesomeIcon
                                    icon={txn.type === "Payment" ? faMoneyBillWave : faCreditCard}
                                    className="transaction-icon"
                                />
                                <div>
                                    <p className="transaction-info">
                                        <strong>{txn.name}</strong> <span>${txn.amount.toFixed(2)}</span>
                                    </p>
                                    <span>
                                        {txn.pending ? "Pending - " : ""}
                                        {txn.user ? `${txn.user} - ` : ""}
                                        {formatTransactionDate(txn.date)}
                                    </span>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No transactions available.</p>
                    )}
                </ul>
        </div>
    );
};

export default TransactionList;
