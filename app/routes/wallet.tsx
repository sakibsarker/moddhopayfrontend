import React, { useState, useEffect } from "react";
import {
  FiDollarSign,
  FiUser,
  FiMail,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiSend,
} from "react-icons/fi";
import { Link } from "react-router";
import Loader from "~/components/Loader";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string; // Optional fields
  role: string;
}

interface UserWallet {
  wallet: {
    id: string;
    balance: string;
  };
}

// Add this interface for the API transaction type
interface Transaction {
  id: number;
  amount: string;
  transaction_type: string;
  created_at: string;
  updated_at: string;
  sender: number;
  receiver: number;
  sender_email: string;
  receiver_email: string;
}

interface TransactionResponse {
  Transactions: Transaction[];
}

// Sample transaction data

export default function Wallet() {
  // Sample user data

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [transferAmount, setTransferAmount] = useState("");
  const [transferEmail, setTransferEmail] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userWallet, setUserWallet] = useState<UserWallet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/users/profile/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch profile.");
        }

        const data: UserProfile = await response.json();
        setUserProfile(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchWallet = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/wallets/me/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch profile.");
        }

        const data: UserWallet = await response.json();
        setUserWallet(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  // Add new useEffect for fetching transactions
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication token not found.");
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/wallets/transactions/all/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch transactions.");
        }

        const data: TransactionResponse = await response.json();
        setTransactions(data.Transactions);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0 || !userWallet?.wallet?.balance) {
      alert("Invalid transfer amount");
      return;
    }

    const walletBalance = parseFloat(userWallet.wallet.balance);
    if (amount > walletBalance) {
      alert("Insufficient balance");
      return;
    }

    const newTransaction: Transaction = {
      id: Math.floor(Math.random() * 1000), // temporary ID
      amount: amount.toFixed(2),
      transaction_type: "TRANSFER",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      sender: parseInt(userProfile?.id || "0"),
      receiver: 0, // You'll need to get the actual receiver ID
      sender_email: userProfile?.email || "",
      receiver_email: "", // You'll need to get the actual receiver email
    };

    setTransactions([newTransaction, ...transactions]);
    setTransferAmount("");
    setTransferEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Wallet Details Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Wallet Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center text-blue-600 mb-2">
                <FiDollarSign className="w-5 h-5 mr-2" />

                <span className="font-semibold">Total Balance</span>
              </div>
              {userWallet && (
                <p className="text-3xl font-bold text-blue-700">
                  $ {userWallet.wallet?.balance}
                </p>
              )}
            </div>
            {userProfile && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center text-green-600 mb-2">
                  <FiUser className="w-5 h-5 mr-2" />
                  <span className="font-semibold">User Name</span>
                </div>
                <p className="text-xl font-semibold text-green-700">
                  {userProfile.name}
                </p>
              </div>
            )}
            {userProfile && (
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center text-purple-600 mb-2">
                  <FiMail className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Email</span>
                </div>
                <p className="text-lg font-medium text-purple-700">
                  {userProfile.email}
                </p>
              </div>
            )}
          </div>

          <Link
            to="/wallet/transfer"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Transfer
          </Link>
          <Link
            to="/profile"
            className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Profile
          </Link>
        </div>

        {/* Transaction Details Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Transaction Details
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="px-4 py-2 font-semibold text-gray-600">
                    Type
                  </th>
                  <th className="px-4 py-2 font-semibold text-gray-600">
                    Transfer Type
                  </th>
                  <th className="px-4 py-2 font-semibold text-gray-600">
                    Amount
                  </th>
                  <th className="px-4 py-2 font-semibold text-gray-600">
                    Description
                  </th>
                  <th className="px-4 py-2 font-semibold text-gray-600">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.transaction_type === "TRANSFER"
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }`}
                      >
                        <FiSend className="w-3 h-3 mr-1" />
                        {transaction.transaction_type.toLowerCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {transaction.sender === parseInt(userProfile?.id || "0")
                        ? "Outgoing"
                        : "Incoming"}
                    </td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        transaction.sender === parseInt(userProfile?.id || "0")
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {transaction.sender === parseInt(userProfile?.id || "0")
                        ? "-"
                        : "+"}
                      ${transaction.amount}
                    </td>
                    <td className="px-4 py-3">Transfer</td>
                    <td className="px-4 py-3">
                      {transaction.sender === parseInt(userProfile?.id || "0")
                        ? transaction.receiver_email
                        : transaction.sender_email}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
