"use client";

import { Package } from "@/types/package";
import DefaultLayout from "../Layouts/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import { OrderDetail, OrderHeader } from "@/types/order";
import { createClient } from "@/helper/supabase/client";
import { ToastError, ToastSuccess } from "@/helper/Toast";
import Link from "next/link";
import { Modal } from "../Modals/Modal";
import { useSearchParams } from "next/navigation";
import { formatToIDR } from "@/helper/idrFormatter";

const TableOrderDetailPageContent = () => {
  const searchParams = useSearchParams();

  const [selectedId, setSelectedId] = useState(searchParams.get("id"));
  const [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);
  const [orderHeader, setOrderHeader] = useState<OrderHeader>();
  const [isLoading, setIsLoading] = useState(false);

  const handlePaid = async () => {
    if (window.confirm("Apakah anda yakin ingin mengkonfirmasi pesanan?")) {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("orderheader")
          .update({ status: "paid" })
          .match({ id: selectedId });

        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          ToastSuccess("Berhasil konfirmasi pesanan!");
          console.log(data);
          setIsLoading(false);
          fetchDetailData();
        }
      } catch (error) {
        if (error instanceof Error) {
          ToastError(error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    }
  };

  const fetchDetailData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("orderdetail")
        .select("*")
        .eq("idheader", selectedId);
      const { data: data2, error: error2 } = await supabase
        .from("orderheader")
        .select("*")
        .eq("id", selectedId)
        .maybeSingle();
      if (error) {
        console.error("Error fetching data:", error.message);
      } else if (error2) {
        console.error("Error fetching data:", error2.message);
      } else {
        setOrderDetail(data);
        setOrderHeader(data2);
        console.log(data);
        setIsLoading(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        ToastError(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    fetchDetailData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Order Detail" />
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          {!isLoading && orderHeader ? (
            <div className="mb-4 flex flex-row items-center justify-between ">
              <div>
                <p className="mb-2 text-title-md font-medium text-black dark:text-white">
                  Order {orderHeader.id}
                </p>
                <p
                  className={`mb-2 inline-flex rounded-lg bg-opacity-10 px-3 py-1 text-sm font-medium capitalize ${
                    orderHeader.status === "paid"
                      ? "bg-success text-success"
                      : orderHeader.status === "unpaid"
                        ? "bg-danger text-danger"
                        : "bg-warning text-warning"
                  }`}
                >
                  {orderHeader.status}
                </p>
                <p>Pelanggan: {orderHeader.nama}</p>
              </div>
              {orderHeader.status === "paid" ||
              orderHeader.status === "Paid" ? null : (
                <button
                  className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={handlePaid}
                >
                  Konfirmasi Pesanan
                </button>
              )}
            </div>
          ) : null}

          <div className="max-w-full overflow-x-auto">
            {!isLoading && (
              <table className="w-full table-auto">
                <thead>
                  <tr className="bg-gray-2 text-left dark:bg-meta-4">
                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                      Menu
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Jumlah
                    </th>
                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                      Harga Satuan
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Varian
                    </th>
                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetail.map((order, key) => {
                    const timestampObj = new Date(order.created_at);

                    const date = timestampObj.toLocaleDateString(); // Example: "1/23/2025"
                    const time24Hour = timestampObj
                      .toTimeString()
                      .split(" ")[0]; // Extract time without AM/PM

                    return (
                      <tr key={key}>
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {order.namaproduk}
                          </h5>
                          <p className="text-sm capitalize">
                            Tipe: {order.tipemenu}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p>{order.jumlah}</p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          {1 + 1 === 3 ? (
                            <>
                              <h5 className="font-medium text-black dark:text-white">
                                {date}
                              </h5>
                              <p className="text-sm">at {time24Hour}</p>
                            </>
                          ) : (
                            <p className="capitalize">
                              {formatToIDR(order.harga)}
                            </p>
                          )}
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="capitalize">{order.penyajian}</p>
                        </td>

                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="font-bold capitalize">
                            {formatToIDR(order.harga * order.jumlah)}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td
                      className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark"
                      colSpan={5}
                    >
                      <p className="text-center font-medium text-black">
                        Lainnya
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={4}
                      className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11"
                    >
                      <h5 className="font-medium text-black dark:text-white">
                        PPN
                      </h5>
                      <p className="text-sm capitalize">12% * 11/12</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="font-bold capitalize">
                        {formatToIDR(
                          0.11 *
                            orderDetail.reduce((total, item) => {
                              return total + item.harga * item.jumlah;
                            }, 0),
                        )}
                      </p>
                    </td>
                  </tr>
                  <tr className="bg-green-200">
                    <td
                      colSpan={4}
                      className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11"
                    >
                      <h5 className="font-medium text-black dark:text-white">
                        Grand Total
                      </h5>
                      <p className="text-sm capitalize">Subtotal + PPN</p>
                    </td>
                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                      <p className="font-bold capitalize">
                        {formatToIDR(
                          orderDetail.reduce((total, item) => {
                            return total + item.harga * item.jumlah;
                          }, 0) +
                            0.11 *
                              orderDetail.reduce((total, item) => {
                                return total + item.harga * item.jumlah;
                              }, 0),
                        )}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default TableOrderDetailPageContent;
