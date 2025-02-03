import React from "react";
import { Metadata } from "next";
import PromoListPageContent from "@/components/Daftar/DaftarPromo";

export const metadata: Metadata = {
  title: "Daftar Promo Sarkara",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const DaftarPromoPage = () => {
  return <PromoListPageContent />;
};

export default DaftarPromoPage;
