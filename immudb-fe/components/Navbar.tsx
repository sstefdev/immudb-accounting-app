import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { AccountingIcon } from "@/icons";
import Button from "./Button";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <AccountingIcon color="#fff" className="w-[40px]" />
            <Link href="/" className="text-white font-bold text-xl">
              ImmuDB Accounting
            </Link>
            <Link
              href="/create-account"
              className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium ml-5"
            >
              Create Account
            </Link>
          </div>
          <div className="flex">
            <button
              onClick={logout}
              className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium ml-4"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
