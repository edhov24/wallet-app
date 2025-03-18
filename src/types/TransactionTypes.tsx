export type Transaction = {
    id: number;
    type: "Credit" | "Payment";
    amount: number;
    name: string;
    description: string;
    date: string;
    pending: boolean;
    user?: string;
};