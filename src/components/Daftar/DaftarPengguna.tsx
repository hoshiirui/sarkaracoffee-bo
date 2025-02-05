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
import { BsArrowClockwise } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface userData {
  id: string;
  nama: string;
  role: string;
  status: boolean;
  username: string;
  created_by: {
    id?: string;
    nama?: string;
  };
  created_at: string;
}

const StaffListPageContent = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [defaultUserDatas, setDefaultUserDatas] = useState<userData[]>();
  const [userDatas, setUserDatas] = useState<userData[]>();
  const [isAdd, setIsAdd] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [name, setName] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [role, setRole] = useState("biasa");

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const fetchData = async () => {
    setIsLoading(true);
    const supabase = createClient();

    try {
      const { data, error } = await supabase
        .from("pegawai")
        .select("*, created_by(id, nama)")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        setDefaultUserDatas(data);
        setUserDatas(data);
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
    if (JSON.parse(localStorage.getItem("user") || "").role === "biasa") {
      ToastError("Kamu tidak memiliki akses untuk melihat halaman ini!");
      router.push("/");
    }
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah anda yakin ingin menghapus pengguna?")) {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("pegawai")
          .delete()
          .match({ id: id });
        if (error) {
          console.error("Gagal menghpaus data:", error.message);
        } else {
          ToastSuccess("Berhasil menghapus pengguna!");
          fetchData();
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

  const handleCreate = async () => {
    setBtnLoading(true);
    const supabase = createClient();

    const userData = {
      nama: name,
      username: username,
      role: role,
      password: password,
      status: true,
      created_by: JSON.parse(localStorage.getItem("user") || "").id,
    };

    try {
      const { data, error } = await supabase.from("pegawai").insert(userData);

      if (error) {
        console.error("Gagal menambahkan pengguna!:", error.message);
      } else {
        ToastSuccess("Berhasil menambahkan pengguna!");
        setBtnLoading(false);
        setPassword("");
        setConfPassword("");
        setIsAdd(false);
        setName("");
        setUsername("");
        fetchData();
      }
    } catch (error) {
      if (error instanceof Error) {
        ToastError(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const handleStatusToggle = async (id: string, status: boolean) => {
    if (
      window.confirm(
        `Apakah anda yakin ingin ${status ? "menonaktifkan" : "mengaktifkan"} pengguna?`,
      )
    ) {
      const supabase = createClient();

      try {
        const { data, error } = await supabase
          .from("pegawai")
          .update({ status: `${status ? false : true}` })
          .match({ id: id });
        if (error) {
          console.error("Gagal menghpaus data:", error.message);
        } else {
          ToastSuccess(
            `Berhasil ${status ? "menonaktifkan" : "mengaktifkan"} pengguna!`,
          );
          fetchData();
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

  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Daftar Pengguna" />
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            {!isAdd && (
              <div className="mb-4 flex flex-row items-center justify-end">
                <button
                  className="inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                  onClick={() => setIsAdd(true)}
                >
                  Tambah Pengguna
                </button>
              </div>
            )}

            {/* tambah pengguna */}
            {isAdd && (
              <>
                {" "}
                <h2 className="text-title-sm2 font-semibold text-black dark:text-white">
                  Form Tambah Pengguna
                </h2>
                <div className="relative mb-4 flex items-center justify-between bg-white pt-4">
                  <div className="w-1/2 pr-2">
                    <label className="text-md mb-3 block font-medium text-black dark:text-white">
                      Nama
                    </label>
                    <input
                      name="name"
                      placeholder="Masukkan nama pengguna"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
                    ></input>
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="text-md mb-3 block font-medium text-black dark:text-white">
                      Username
                    </label>
                    <input
                      name="username"
                      type="text"
                      value={username}
                      placeholder="Masukkan username pengguna"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
                    ></input>
                  </div>
                </div>
                <div className="relative mb-4 flex items-center justify-between bg-white">
                  <div className="w-1/2 pr-2">
                    <label className="text-md mb-3 block font-medium text-black dark:text-white">
                      Password
                    </label>
                    <input
                      name="password"
                      placeholder="Masukkan password pengguna"
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
                    ></input>
                  </div>
                  <div className="w-1/2 pl-2">
                    <label className="text-md mb-3 block font-medium text-black dark:text-white">
                      Konfirmasi Password
                    </label>
                    <input
                      name="confPassword"
                      type="password"
                      value={confPassword}
                      placeholder="Konfirmasi password"
                      onChange={(e) => {
                        setConfPassword(e.target.value);
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input `}
                    ></input>
                  </div>
                </div>
                <div className="relative mb-4 flex items-center justify-between bg-white">
                  <div className="w-full">
                    <label className="text-md mb-3 block font-medium text-black dark:text-white">
                      Role
                    </label>

                    <select
                      name="role"
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                        changeTextColor();
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                        isOptionSelected
                          ? "dark:border-form-strokedark dark:text-white"
                          : ""
                      }`}
                    >
                      <option
                        value="biasa"
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
                </div>
                <div className="mb-8 flex flex-row items-center justify-end gap-3">
                  <button
                    className="inline-flex items-center justify-center rounded-md bg-red px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    onClick={() => {
                      setIsAdd(false);
                      setPassword("");
                      setConfPassword("");
                    }}
                  >
                    Batal
                  </button>
                  <button
                    className={`inline-flex items-center justify-center rounded-md bg-meta-3 px-10 py-3 text-center font-medium text-white hover:bg-opacity-90 disabled:bg-slate-500 lg:px-8 xl:px-10`}
                    onClick={handleCreate}
                    disabled={
                      username === "" ||
                      name === "" ||
                      password === "" ||
                      password != confPassword ||
                      btnLoading
                    }
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
                    Info Pegawai
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Role
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Tanggal Dibuat
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Status
                  </th>
                  <th className="px-4 py-4 font-medium text-black dark:text-white">
                    Aksi
                  </th>
                </tr>
              </thead>
              {!isLoading && userDatas ? (
                <tbody>
                  {userDatas.map((order, key) => {
                    const timestampObj = new Date(order.created_at);

                    const date = timestampObj.toLocaleDateString(); // Example: "1/23/2025"
                    const time24Hour = timestampObj
                      .toTimeString()
                      .split(" ")[0]; // Extract time without AM/PM

                    return (
                      <tr
                        key={key}
                        className={`${order.username === JSON.parse(localStorage.getItem("user") || "none").username ? "bg-green-50" : null}`}
                      >
                        <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                          <h5 className="font-medium text-black dark:text-white">
                            {order.nama}
                          </h5>
                          <p className="text-sm">{order.username}</p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p className="capitalize">{order.role}</p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <h5 className="font-medium text-black dark:text-white">
                            {date}
                          </h5>
                          <p className="text-sm">at {time24Hour}</p>
                        </td>
                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                          <p
                            className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium capitalize ${
                              order.status
                                ? "bg-success text-success"
                                : "bg-danger text-danger"
                            }`}
                          >
                            {order.status ? "Aktif" : "Non-Aktif"}
                          </p>
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
                            {order.username ===
                              JSON.parse(localStorage.getItem("user") || "none")
                                .username || order.role === "pemilik" ? null : (
                              <button
                                className="hover:text-primary"
                                onClick={() => handleDelete(order.id)}
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
                            )}

                            {order.username ===
                              JSON.parse(localStorage.getItem("user") || "none")
                                .username || order.role === "pemilik" ? null : (
                              <button
                                className="hover:text-primary"
                                onClick={() =>
                                  handleStatusToggle(order.id, order.status)
                                }
                              >
                                <BsArrowClockwise />
                              </button>
                            )}
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
    </>
  );
};

export default StaffListPageContent;
