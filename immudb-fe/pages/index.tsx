import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { getAccounts } from "@/services/api";
import { Button, Dropdown, SingleAccount, SkeletonLoader } from "@/components";

const Home = () => {
  const [accounts, setAccounts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      setIsLoading(true);
      try {
        const data = await getAccounts(page, limit);
        setAccounts(data.documents);
        setTotalPages(Math.ceil(data.totalCount / limit));
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAccounts();
  }, [page, limit]);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleLimitChange = (selectedLimit: string) => {
    setLimit(parseInt(selectedLimit, 10));
    setPage(1);
  };

  return (
    <>
      <NextSeo
        title="Home"
        description="View your accounting records with ImmuDB Accounting"
      />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex items-center justify-between mb-[40px]">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">
                Accounting Records ({isLoading ? "..." : accounts.length})
              </h1>
              {!isLoading && accounts.length > 0 && (
                <Dropdown
                  id="limit"
                  name="limit"
                  label="Records per page"
                  className="w-[200px]"
                  value={limit}
                  onChange={handleLimitChange}
                  options={[
                    { label: "5", value: "5" },
                    { label: "10", value: "10" },
                    { label: "20", value: "20" },
                    { label: "50", value: "50" },
                  ]}
                />
              )}
            </div>
            {isLoading ? (
              <div className="space-y-4">
                <SkeletonLoader />
              </div>
            ) : accounts.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {accounts.map((account: Account) => (
                  <li key={account._id} className="py-4">
                    <SingleAccount {...account} />
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-black mt-5">
                Please create an account to view it in the dashboard.
              </p>
            )}
            {!isLoading && accounts.length > 0 && (
              <div className="flex justify-between mt-6 items-center">
                <button
                  onClick={handlePreviousPage}
                  disabled={page === 1}
                  className="bg-blue-500 text-white rounded disabled:opacity-50 w-fit h-fit px-[5px] py-[5px]"
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={page === totalPages}
                  className="bg-blue-500 text-white rounded disabled:opacity-50 w-fit h-fit px-[5px] py-[5px]"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
