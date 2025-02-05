"use client";

import { Package } from "@/types/package";
import DefaultLayout from "../Layouts/DefaultLayout";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useEffect, useState } from "react";
import { OrderHeader } from "@/types/order";
import { createClient } from "@/helper/supabase/client";
import { ToastError, ToastSuccess } from "@/helper/Toast";
import Link from "next/link";
import { Modal } from "../Modals/Modal";
import { MenuSarkara } from "@/types/MenuSarkara";
import { formatToIDR } from "@/helper/idrFormatter";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";

const MenuListTablePageContent = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuSarkara>();
  const [selectedProducts, setSelectedProducts] = useState<MenuSarkara[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);

  //menu form
  const [formNama, setFormNama] = useState("");
  const [formImage, setFormImage] = useState<any>();
  const [formPrice, setFormPrice] = useState(0);
  const [formPrior, setFormPrior] = useState(0);
  const [formMenuType, setFormMenuType] = useState("coffee");
  const [formCategory, setFormCategory] = useState<string[]>([]);
  const [formDetail, setFormDetail] = useState("");

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("menu")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setSelectedProducts(data);
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
    fetchData();
    // fetchDetailData();
  }, []);

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Daftar Menu" />
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            {(JSON.parse(localStorage.getItem("user") || "").role === "admin" ||
              JSON.parse(localStorage.getItem("user") || "").role ===
                "pemilik") &&
            !isAdd ? (
              <div className="mb-4 flex flex-row items-center justify-end">
                <button
                  className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={() => setIsAdd(true)}
                >
                  Tambah Menu
                </button>
              </div>
            ) : null}

            {isAdd && (
              <>
                {" "}
                <h2 className="text-title-sm2 font-semibold text-black dark:text-white">
                  Form Tambah Menu
                </h2>
                <div className="relative mb-4 flex items-center justify-between bg-white pt-4">
                  <div className="w-1/2 pr-2">
                    <label className="text-md mb-3 block font-medium text-black dark:text-white">
                      Nama Menu
                    </label>
                    <input
                      name="name"
                      placeholder="Masukkan nama menu"
                      type="text"
                      value={formNama}
                      onChange={(e) => {
                        setFormNama(e.target.value);
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
                    ></input>
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="text-md mb-3 block font-medium text-black dark:text-white">
                      Harga Menu
                    </label>
                    <input
                      name="price"
                      type="number"
                      value={formPrice}
                      placeholder="Masukkan username pengguna"
                      onChange={(e) => {
                        setFormPrice(Number(e.target.value));
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
                    ></input>
                  </div>
                </div>
                <div className="relative mb-4 flex items-center justify-between bg-white">
                  <div className="w-1/2 pr-2">
                    <label className="text-md mb-3 block font-medium text-black dark:text-white">
                      Tipe Menu
                    </label>
                    <select
                      name="role"
                      value={formMenuType}
                      onChange={(e) => {
                        setFormMenuType(e.target.value);
                        changeTextColor();
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                        isOptionSelected
                          ? "dark:border-form-strokedark dark:text-white"
                          : ""
                      }`}
                    >
                      <option
                        value="coffee"
                        className="text-body dark:text-bodydark"
                      >
                        Pegawai Biasa
                      </option>
                      <option
                        value="admin"
                        className="text-body dark:text-bodydark"
                      >
                        Administrator
                      </option>
                    </select>
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="text-md mb-3 block font-medium text-black dark:text-white">
                      Prioritas Rekomendasi
                    </label>
                    <input
                      name="confPassword"
                      type="number"
                      value={formPrior}
                      placeholder="Konfirmasi password"
                      onChange={(e) => {
                        setFormPrior(Number(e.target.value));
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
                    ></input>
                  </div>
                </div>
                <div className="relative mb-4 flex justify-between bg-white">
                  <div className="w-1/2 pr-2">
                    <label className="text-md mb-3 block font-medium text-black dark:text-white">
                      Kategori Menu
                    </label>
                    <select
                      name="role"
                      value={formCategory}
                      onChange={(e) => {
                        // setFormCategory(e.target.value);
                        // changeTextColor();
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                        isOptionSelected
                          ? "dark:border-form-strokedark dark:text-white"
                          : ""
                      }`}
                    >
                      <option
                        value="coffee"
                        className="text-body dark:text-bodydark"
                      >
                        Pegawai Biasa
                      </option>
                      <option
                        value="admin"
                        className="text-body dark:text-bodydark"
                      >
                        Administrator
                      </option>
                    </select>
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="text-md mb-3 block font-medium text-black dark:text-white">
                      Detail Menu
                    </label>
                    <textarea
                      name="confPassword"
                      value={formDetail}
                      placeholder="Masukkan detail menu"
                      onChange={(e) => {
                        setFormDetail(e.target.value);
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
                    ></textarea>
                  </div>
                </div>
                <label className="text-md mb-3 block font-medium text-black dark:text-white">
                  Gambar Menu
                </label>
                <div
                  id="FileUpload"
                  className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                          fill="#3C50E0"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                          fill="#3C50E0"
                        />
                      </svg>
                    </span>
                    <p>
                      <span className="text-primary">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                    <p>(max, 800 X 800px)</p>
                  </div>
                </div>
                {/* button submit */}
                <div className="mb-8 flex flex-row items-center justify-end gap-3">
                  <button
                    className="inline-flex items-center justify-center rounded-md bg-red px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    onClick={() => {
                      setIsAdd(false);
                    }}
                  >
                    Batal
                  </button>
                  <button
                    className={`inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 disabled:bg-slate-500 lg:px-8 xl:px-10`}
                    // onClick={handleCreate}
                    // disabled={
                    //   username === "" ||
                    //   name === "" ||
                    //   password === "" ||
                    //   password != confPassword ||
                    //   btnLoading
                    // }
                  >
                    Simpan
                  </button>
                </div>
              </>
            )}

            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                  <th className="min-w-[175px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                    Nama Menu
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Harga
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Kategori / Penyajian
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Prioritas
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Aksi
                  </th>
                </tr>
              </thead>
              {!isLoading && selectedProducts ? (
                <tbody>
                  {selectedProducts.map((order, key) => {
                    const timestampObj = new Date(order.created_at);

                    const date = timestampObj.toLocaleDateString(); // Example: "1/23/2025"
                    const time24Hour = timestampObj
                      .toTimeString()
                      .split(" ")[0]; // Extract time without AM/PM

                    return (
                      <tr key={key}>
                        <td className="flex flex-row items-center gap-4 border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                          <div
                            className="h-14 w-14 cursor-pointer"
                            onClick={() => {
                              setSelectedMenu(order);
                              setOpen(true);
                            }}
                          >
                            <img
                              className="size-full rounded-lg object-cover"
                              width={200}
                              height={200}
                              src={`https://nqzspgzcbmwdwnzdhbrl.supabase.co/storage/v1/object/public/menuimages//${order.imageSrc}`}
                              alt={order.name}
                            />
                          </div>

                          <div>
                            <h5 className="font-medium text-black dark:text-white">
                              {order.name}
                            </h5>
                            <p className="text-sm capitalize">
                              {" "}
                              {order.menuType === "food"
                                ? "Food & Snacks "
                                : order.menuType === "others"
                                  ? "Tea & Squash & Others"
                                  : order.menuType}
                            </p>
                          </div>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="capitalize">
                            {formatToIDR(order.price)}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <div className="flex h-full flex-row items-center gap-2 ">
                            {order.categories.map((cat) => (
                              <p className="rounded-lg bg-gray-100 px-2 py-1 capitalize">
                                {cat}
                              </p>
                            ))}
                          </div>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p>{order.recPrior}</p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <div className="flex items-center space-x-3.5">
                            <Link
                              className="flex flex-col items-center justify-center"
                              href={`pengguna/details?id=${order.id}`}
                            >
                              <button className="hover:text-primary">
                                <svg
                                  className="fill-current"
                                  width="18"
                                  height="18"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                    fill=""
                                  />
                                  <path
                                    d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                    fill=""
                                  />
                                </svg>
                              </button>
                            </Link>

                            <button
                              className="hover:text-primary"
                              //   onClick={() => handleDelete(order.id)}
                            >
                              <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                  fill=""
                                />
                                <path
                                  d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                  fill=""
                                />
                                <path
                                  d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                  fill=""
                                />
                                <path
                                  d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                  fill=""
                                />
                              </svg>
                            </button>

                            {/* <button
                                className="hover:text-primary"
                                onClick={() =>
                                  handleStatusToggle(order.id, order.status)
                                }
                              >
                                <BsArrowClockwise />
                              </button> */}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              ) : null}
            </table>
          </div>
        </div>
      </DefaultLayout>
      {/* <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={[
          {
            src: `https://nqzspgzcbmwdwnzdhbrl.supabase.co/storage/v1/object/public/menuimages//${selectedMenu?.imageSrc}`,
          },
        ]}
      /> */}
    </>
  );
};

export default MenuListTablePageContent;
