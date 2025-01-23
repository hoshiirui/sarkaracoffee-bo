// import PengaturanPerusahaanPageContent from "@/components/Pengaturan/Perusahaan";
import TableOrderListPageContent from "@/components/Tables/TableOrderList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman Order Masuk",
  description: "Pengaturan Perusahaan BWF",
};

const OrderPage = () => {
  return <TableOrderListPageContent />;
};

export default OrderPage;
