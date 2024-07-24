import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { createAccount } from "@/services/api";
import { useAuth } from "@/context/AuthContext";

const CreateAccount = () => {
  const [accountData, setAccountData] = useState({
    accountNumber: "",
    accountName: "",
    iban: "",
    address: "",
    amount: "",
    type: "sending",
  });
  const [isClient, setIsClient] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAccountData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAccount({
        ...accountData,
        amount: parseFloat(accountData.amount),
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to create account:", error);
    }
  };

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      router.push("/login");
    }
  }, [isClient, isAuthenticated, router]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create New Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                id="accountNumber"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={accountData.accountNumber}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="accountName"
                className="block text-sm font-medium text-gray-700"
              >
                Account Name
              </label>
              <input
                type="text"
                name="accountName"
                id="accountName"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={accountData.accountName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="iban"
                className="block text-sm font-medium text-gray-700"
              >
                IBAN
              </label>
              <input
                type="text"
                name="iban"
                id="iban"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={accountData.iban}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={accountData.address}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              <input
                type="number"
                name="amount"
                id="amount"
                required
                step="0.01"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={accountData.amount}
                onChange={handleChange}
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                name="type"
                id="type"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={accountData.type}
                onChange={handleChange}
              >
                <option value="sending">Sending</option>
                <option value="receiving">Receiving</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
