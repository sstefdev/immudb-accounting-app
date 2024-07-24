import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAccounts } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    } else {
      const fetchAccounts = async () => {
        try {
          const data = await getAccounts();
          setAccounts(data.documents);
        } catch (error) {
          console.error("Failed to fetch accounts:", error);
        }
      };

      fetchAccounts();
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Accounting Records
          </h1>
          <div className="flex justify-between mb-4">
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
            <Link
              href="/create-account"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create New Account
            </Link>
          </div>
          <ul className="divide-y divide-gray-200">
            {accounts.map((account: any) => (
              <li key={account._id} className="py-4">
                <div className="flex space-x-3">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium">
                        {account.accountName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {account.accountNumber}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">
                      IBAN: {account.iban} | Amount: ${account.amount}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
