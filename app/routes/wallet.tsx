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

// Sample transaction data
const initialTransactions = [
  {
    id: 1,
    type: "deposit",
    amount: 500,
    date: "2023-06-01",
    description: "Salary",
    email: "employer@company.com",
  },
  {
    id: 2,
    type: "withdrawal",
    amount: 50,
    date: "2023-06-02",
    description: "Grocery Shopping",
    email: "store@grocery.com",
  },
  {
    id: 3,
    type: "deposit",
    amount: 200,
    date: "2023-06-03",
    description: "Freelance Work",
    email: "client@freelance.com",
  },
  {
    id: 4,
    type: "withdrawal",
    amount: 100,
    date: "2023-06-04",
    description: "Utility Bill",
    email: "billing@utility.com",
  },
  {
    id: 5,
    type: "deposit",
    amount: 1000,
    date: "2023-06-05",
    description: "Client Payment",
    email: "bigclient@company.com",
  },
];

export default function Wallet() {
  // Sample user data
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    balance: 1550,
  });

  const [transactions, setTransactions] = useState(initialTransactions);
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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0 || amount > user.balance) {
      alert("Invalid transfer amount");
      return;
    }

    const newTransaction = {
      id: transactions.length + 1,
      type: "transfer",
      amount: amount,
      date: new Date().toISOString().split("T")[0],
      description: "Transfer",
      email: transferEmail,
    };

    setTransactions([newTransaction, ...transactions]);
    setUser({ ...user, balance: user.balance - amount });
    setTransferAmount("");
    setTransferEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <td className="px-4 py-3">{transaction.date}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === "deposit"
                            ? "bg-green-100 text-green-800"
                            : transaction.type === "withdrawal"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {transaction.type === "deposit" ? (
                          <FiArrowDownLeft className="w-3 h-3 mr-1" />
                        ) : transaction.type === "withdrawal" ? (
                          <FiArrowUpRight className="w-3 h-3 mr-1" />
                        ) : (
                          <FiSend className="w-3 h-3 mr-1" />
                        )}
                        {transaction.type}
                      </span>
                    </td>
                    <td
                      className={`px-4 py-3 font-medium ${
                        transaction.type === "deposit"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "deposit" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3">{transaction.description}</td>
                    <td className="px-4 py-3">{transaction.email}</td>
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
