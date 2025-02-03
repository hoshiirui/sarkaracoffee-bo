// import PengaturanPerusahaanPageContent from "@/components/Pengaturan/Perusahaan";
import TableOrderDetailPageContent from "@/components/Tables/TableOrderDetail";
import TableOrderListPageContent from "@/components/Tables/TableOrderList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Halaman Detail Order",
  description: "Pengaturan Perusahaan BWF",
};

const OrderPage = () => {
  return <TableOrderDetailPageContent />;
};

export default OrderPage;
