import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MenuListPageContent from "@/components/Daftar/DaftarMenu";
import MenuListTablePageContent from "@/components/Tables/TableMenu";

export const metadata: Metadata = {
  title: "Daftar Menu Sarkara",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const DaftarMenuPage = () => {
  return <MenuListTablePageContent />;
};

export default DaftarMenuPage;
