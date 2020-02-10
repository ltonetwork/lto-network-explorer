export interface Block {
    timestamp: string;
    transactions: Transaction[];
}

export interface Transaction {
    timestamp: string;
    fee: number;
    type: number;
    transfers: Transfer[]
    amount: number;
    totalAmount: number;
}

export interface Transfer {
    amount: number;
}
