import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import LoginPageContent from "@/components/Auth/LoginPage";

export const metadata: Metadata = {
  title: "Sarkara Back Office Login",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const LoginPage = () => {
  return <LoginPageContent />;
};

export default LoginPage;
