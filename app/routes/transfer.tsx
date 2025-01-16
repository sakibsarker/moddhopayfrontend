import React, { useState } from "react";
import {
  FiAlertCircle,
  FiX,
  FiCheckCircle,
  FiDollarSign,
} from "react-icons/fi";

interface FormData {
  amount: string;
  email: string;
}
export default function transfer() {
  const [formData, setFormData] = useState<FormData>({
    amount: "",
    email: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showConfirm, setShowConfirm] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (
      !formData.amount ||
      isNaN(Number(formData.amount)) ||
      Number(formData.amount) <= 0
    ) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowConfirm(true);
    }
  };

  const handleConfirm = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Authentication token not found.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/wallets/transactions/create/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            receiver_email: formData.email,
            amount: parseFloat(formData.amount),
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Transaction successful:", data);
        alert("Transaction successful!");
        setShowConfirm(false);
        setFormData({ amount: "", email: "" });
      } else {
        const errorData = await response.json();
        console.error("Transaction failed:", errorData);
        alert(errorData.error || "Transaction failed.");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Transfer Payment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FiDollarSign />
                </span>
                <input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className={`w-full pl-8 pr-3 py-2 rounded-md border ${
                    errors.amount ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                />
              </div>
              {errors.amount && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <FiAlertCircle className="h-4 w-4" />
                  {errors.amount}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter recipient's email"
                className={`w-full px-3 py-2 rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <FiAlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Continue to Payment
            </button>
          </form>
        </div>

        {/* Confirmation Dialog */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Confirm Payment
                </h3>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to send this payment?
                </p>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Amount:</span>
                    <span className="font-semibold">${formData.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">To:</span>
                    <span className="font-semibold">{formData.email}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center"
                >
                  <FiX className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors flex items-center"
                >
                  <FiCheckCircle className="h-4 w-4 mr-2" />
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
