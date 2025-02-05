import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react";
import PengaturanPengguna from "@/components/Pengaturan/PengaturanPengguna";

export const metadata: Metadata = {
  title: "Pengaturan Pengguna",
  description:
    "This is Next.js Settings page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Settings = () => {
  return <PengaturanPengguna />;
};

export default Settings;
