import React from "react";
import { Metadata } from "next";
import StaffListPageContent from "@/components/Daftar/DaftarPengguna";

export const metadata: Metadata = {
  title: "Daftar Pegawai Sarkara",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const DaftarPenggunaPage = () => {
  return <StaffListPageContent />;
};

export default DaftarPenggunaPage;
