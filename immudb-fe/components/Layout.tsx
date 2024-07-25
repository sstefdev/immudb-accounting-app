// components/AuthLayout.tsx
import { ReactNode } from "react";
import Navbar from "./Navbar";

interface AuthLayoutProps {
  children: ReactNode;
  shouldRender: boolean;
}

const AuthLayout = ({ children, shouldRender }: AuthLayoutProps) => {
  if (!shouldRender) {
    return <>{children}</>;
  }

  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default AuthLayout;
