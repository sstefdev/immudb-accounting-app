import "../styles/globals.css";
import { DefaultSeo } from "next-seo";
import { Layout } from "@/components";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { AuthProvider, useAuth } from "@/context/AuthContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <DefaultSeo
        titleTemplate="%s | ImmuDB Accounting"
        defaultTitle="ImmuDB Accounting"
        description="Secure and efficient accounting with ImmuDB"
      />
      <AppContent Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
};

const AppContent = ({
  Component,
  pageProps,
}: {
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
}) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const publicPaths = ["/auth/login", "/auth/register"];
    const isPublicPath = publicPaths.includes(router.pathname);

    if (!isAuthenticated && !isPublicPath) {
      router.push("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const shouldRenderAuthLayout =
    isAuthenticated &&
    router.pathname !== "/auth/login" &&
    router.pathname !== "/auth/register";

  return (
    <Layout shouldRender={shouldRenderAuthLayout}>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
