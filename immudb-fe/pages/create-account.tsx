import { useState } from "react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { createAccount } from "@/services/api";
import { Button, Dropdown, Input } from "@/components";

const CreateAccount = () => {
  const [accountData, setAccountData] = useState({
    accountNumber: "",
    accountName: "",
    iban: "",
    address: "",
    amount: "",
    type: "sending",
  });

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

  return (
    <>
      <NextSeo
        title="Create Account"
        description="Create a new accounting record with ImmuDB Accounting"
      />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create New Account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Input
                id="accountNumber"
                name="accountNumber"
                type="text"
                label="Account Number"
                value={accountData.accountNumber}
                onChange={handleChange}
                required
              />
              <Input
                id="accountName"
                name="accountName"
                type="text"
                label="Account Name"
                value={accountData.accountName}
                onChange={handleChange}
                required
              />
              <Input
                id="iban"
                name="iban"
                type="text"
                label="IBAN"
                value={accountData.iban}
                onChange={handleChange}
                required
              />
              <Input
                id="address"
                name="address"
                type="text"
                label="Address"
                value={accountData.address}
                onChange={handleChange}
                required
              />
              <Input
                id="amount"
                name="amount"
                type="number"
                label="Amount"
                value={accountData.amount}
                onChange={handleChange}
                required
              />
              <Dropdown
                id="type"
                name="type"
                label="Type"
                options={[
                  { value: "sending", label: "Sending" },
                  { value: "receiving", label: "Receiving" },
                ]}
                value={accountData.type}
                onChange={(value) =>
                  setAccountData((prev) => ({ ...prev, type: value }))
                }
                required
              />
              <Button type="submit">Create Account</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
