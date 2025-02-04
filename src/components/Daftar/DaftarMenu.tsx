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

const sarkaraProducts = [
  {
    id: 1,
    name: "Sarkara Original Coffee",
    imageSrc: "original.jpg",
    price: 16000,
    recPrior: 10,
    menuType: "signature",
    categories: ["ice"],
    productDetail:
      "Kopi khas Sarkara dengan perpaduan rasa unik dan menyegarkan.",
  },
  {
    id: 2,
    name: "Sarkara Speciality Mocktail",
    imageSrc: "mocktail.jpg",
    price: 18000,
    recPrior: 10,
    menuType: "signature",
    categories: ["ice"],
    productDetail:
      "Minuman tanpa alkohol dengan kombinasi rasa istimewa dan menyegarkan.",
  },
  {
    id: 3,
    name: "Espresso Single",
    imageSrc: "single.webp",
    price: 10000,
    recPrior: 10,
    menuType: "espresso",
    categories: ["hot"],
    productDetail: "Espresso klasik dengan cita rasa kuat dan aroma khas kopi.",
  },
  {
    id: 4,
    name: "Espresso Double",
    imageSrc: "double.webp",
    price: 12000,
    recPrior: 6,
    menuType: "espresso",
    categories: ["hot"],
    productDetail: "Espresso ganda dengan intensitas rasa yang lebih kuat.",
  },
  {
    id: 5,
    name: "Americano",
    imageSrc: "americano.webp",
    price: 15000,
    recPrior: 6,
    menuType: "espresso",
    categories: ["hot", "ice"],
    productDetail:
      "Espresso yang diencerkan dengan air panas atau dingin, cocok bagi pencinta kopi hitam.",
  },
  {
    id: 6,
    name: "Kopi Susu",
    imageSrc: "kopisusu.webp",
    price: 15000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Perpaduan kopi dengan susu, menghasilkan rasa yang lembut dan nikmat.",
  },
  {
    id: 7,
    name: "Latte",
    imageSrc: "latte.webp",
    price: 15000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Espresso dengan susu kukus, menghasilkan rasa yang creamy dan lembut.",
  },
  {
    id: 8,
    name: "Latte + Syrup",
    imageSrc: "lattesyr.jpg",
    price: 20000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Latte dengan tambahan sirup pilihan, memberikan variasi rasa yang menarik.",
  },
  {
    id: 9,
    name: "Cappucino",
    imageSrc: "cappucino.webp",
    price: 17000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Espresso dengan susu kukus dan buih susu yang lembut, menghasilkan rasa yang kaya.",
  },
  {
    id: 10,
    name: "Mochacino",
    imageSrc: "mochaccino.jpg",
    price: 17000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Cappucino dengan tambahan cokelat, menghasilkan rasa yang manis dan nikmat.",
  },
  {
    id: 11,
    name: "Matcha Coffee Milk",
    imageSrc: "matchacoffee.jpg",
    price: 20000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["ice"],
    productDetail:
      "Perpaduan matcha dengan kopi dan susu, menghasilkan rasa unik dan menyegarkan.",
  },
  {
    id: 12,
    name: "Redvelvet Coffee Milk",
    imageSrc: "redvelvetcoffee.jpg",
    price: 20000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["ice"],
    productDetail: "Kopi dengan cita rasa red velvet yang lembut dan creamy.",
  },
  {
    id: 13,
    name: "Oreo Coffee Milk",
    imageSrc: "redvelvetcoffee.jpg",
    price: 20000,
    recPrior: 6,
    menuType: "coffee",
    categories: ["ice"],
    productDetail:
      "Kopi dengan tambahan biskuit Oreo, menghadirkan rasa yang unik dan renyah.",
  },
  {
    id: 14,
    name: "Matcha Latte",
    imageSrc: "matchalatte.jpg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["hot", "ice"],
    productDetail:
      "Minuman hangat atau dingin dengan teh hijau matcha yang lembut dan menyegarkan.",
  },
  {
    id: 15,
    name: "Redvelvet Latte",
    imageSrc: "redvelvetlatte.jpeg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["hot", "ice"],
    productDetail: "Latte dengan cita rasa red velvet yang lembut dan creamy.",
  },
  {
    id: 16,
    name: "Taro Latte",
    imageSrc: "tarolatte.webp",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["hot", "ice"],
    productDetail: "Latte dengan rasa taro yang unik dan eksotis.",
  },
  {
    id: 17,
    name: "Chocolatte",
    imageSrc: "chocolatte.jpg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["hot", "ice"],
    productDetail: "Minuman cokelat hangat atau dingin yang kaya dan lembut.",
  },
  {
    id: 18,
    name: "Vanilla Milk Original",
    imageSrc: "vanillamilk.jpg",
    price: 15000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["hot", "ice"],
    productDetail: "Susu segar dengan aroma dan rasa vanilla yang lembut.",
  },
  {
    id: 19,
    name: "Vanilla Caramel",
    imageSrc: "vanillacaramel.jpg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["ice"],
    productDetail:
      "Susu vanilla dengan tambahan saus karamel, menghasilkan rasa yang manis dan karamelis.",
  },
  {
    id: 20,
    name: "Vanilla Hazelnut",
    imageSrc: "vanillahazelnut.jpeg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["ice"],
    productDetail: "Susu vanilla dengan aroma dan rasa hazelnut yang khas.",
  },
  {
    id: 21,
    name: "Vanilla Oreo",
    imageSrc: "vanillaoreo.jpeg",
    price: 16000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["ice"],
    productDetail: "Susu vanilla dengan campuran biskuit Oreo yang renyah.",
  },
  {
    id: 22,
    name: "Choco Hazelnut",
    imageSrc: "chocohazelnut.jpg",
    price: 18000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["ice"],
    productDetail: "Minuman cokelat dengan aroma dan rasa hazelnut yang khas.",
  },
  {
    id: 23,
    name: "Choco Oreo",
    imageSrc: "chocooreo.webp",
    price: 18000,
    recPrior: 6,
    menuType: "non-coffee",
    categories: ["ice"],
    productDetail: "Minuman cokelat dengan campuran biskuit Oreo yang renyah.",
  },
  {
    id: 24,
    name: "Tea",
    imageSrc: "tea.jpg",
    price: 6000,
    recPrior: 6,
    menuType: "others",
    categories: ["hot", "ice"],
    productDetail: "Teh panas atau dingin yang menyegarkan.",
  },
  {
    id: 25,
    name: "Leci Tea",
    imageSrc: "lycheetea.jpg",
    price: 10000,
    recPrior: 6,
    menuType: "others",
    categories: ["hot", "ice"],
    productDetail: "Teh dengan rasa leci yang manis dan menyegarkan.",
  },
  {
    id: 26,
    name: "Lemon Tea",
    imageSrc: "lemontea.jpg",
    price: 10000,
    recPrior: 6,
    menuType: "others",
    categories: ["hot", "ice"],
    productDetail:
      "Teh dengan perasan lemon, memberikan rasa yang segar dan asam.",
  },
  {
    id: 27,
    name: "Strawberry Tea",
    imageSrc: "strawberrytea.jpg",
    price: 10000,
    recPrior: 6,
    menuType: "others",
    categories: ["hot", "ice"],
    productDetail: "Teh dengan rasa stroberi yang manis dan menyegarkan.",
  },
  {
    id: 28,
    name: "Virgin Squash",
    imageSrc: "virginsquash.jpg",
    price: 15000,
    recPrior: 6,
    menuType: "others",
    categories: ["ice"],
    productDetail: "Minuman segar dengan rasa buah-buahan.",
  },
  {
    id: 29,
    name: "Strawberry Squash",
    imageSrc: "strawberrysquash.jpg",
    price: 15000,
    recPrior: 6,
    menuType: "others",
    categories: ["ice"],
    productDetail:
      "Minuman segar dengan rasa stroberi yang manis dan menyegarkan.",
  },
  {
    id: 30,
    name: "Lemon Squash",
    imageSrc: "lemonsquash.jpg",
    price: 15000,
    recPrior: 6,
    menuType: "others",
    categories: ["ice"],
    productDetail: "Minuman segar dengan rasa lemon yang asam dan menyegarkan.",
  },
  {
    id: 31,
    name: "Leci Squash",
    imageSrc: "lycheesquash.jpeg",
    price: 15000,
    recPrior: 6,
    menuType: "others",
    categories: ["ice"],
    productDetail: "Minuman segar dengan rasa leci yang manis dan menyegarkan.",
  },
  {
    id: 32,
    name: "Mineral Water",
    imageSrc: "mineralwater.jpeg",
    price: 5000,
    recPrior: 6,
    menuType: "others",
    categories: ["hot", "ice"],
    productDetail: "Air mineral untuk menemani hidangan Anda.",
  },
  {
    id: 33,
    name: "Nasi Goreng",
    imageSrc: "nasgor.jpg",
    price: 15000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Nasi goreng yang lezat dan mengenyangkan.",
  },
  {
    id: 34,
    name: "Mie Instan Goreng Lengkap",
    imageSrc: "miegoreng.jpg",
    price: 12000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Mie instan goreng yang lengkap dengan bumbu dan topping.",
  },
  {
    id: 35,
    name: "Mie Instan Kuah Lengkap",
    imageSrc: "miekuah.jpeg",
    price: 12000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Mie instan kuah yang lengkap dengan bumbu dan topping.",
  },
  {
    id: 36,
    name: "Nasi Putih",
    imageSrc: "nasiputih.webp",
    price: 5000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Nasi putih hangat yang siap disajikan.",
  },
  {
    id: 37,
    name: "Telur",
    imageSrc: "telur.jpg",
    price: 5000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Telur sebagai lauk pendamping.",
  },
  {
    id: 38,
    name: "Kentang Goreng",
    imageSrc: "kentanggoreng.jpg",
    price: 10000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Kentang goreng renyah dan gurih.",
  },
  {
    id: 39,
    name: "Roti Panggang",
    imageSrc: "ropang.webp",
    price: 10000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    productDetail: "Roti panggang yang hangat dan lezat.",
  },
  {
    id: 40,
    name: "Pisang Goreng",
    imageSrc: "pisanggoreng.jpg",
    price: 10000,
    recPrior: 6,
    menuType: "food",
    categories: [],
    // variants: [
    //   { name: "coklat", add: 0 },
    //   { name: "keju", add: 0 },
    //   { name: "mix", add: 2000 },
    // ],
    productDetail:
      "Pisang goreng renyah dengan pilihan topping cokelat, keju, atau mix.",
  },
];

const MenuListPageContent = () => {
  const [selectedMenu, setSelectedMenu] = useState<MenuSarkara>();
  const [selectedProducts, setSelectedProducts] = useState<MenuSarkara[]>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSync = async () => {
    const supabase = createClient();
    const filteredMenu = sarkaraProducts.map((item) => ({
      ...item,
      id: uuidv4(),
    }));

    try {
      const { data, error } = await supabase.from("menu").insert(filteredMenu);

      if (error) {
        console.error("Error fetching data:", error.message);
      } else {
        if (data === null) {
          ToastError("Username atau password salah!");
        } else {
          console.log(data);

          ToastSuccess(`Berhasil!`);
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        ToastError(error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

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
            {!isLoading && selectedProducts ? (
              <div className="col-span-2 mb-8 lg:col-span-3">
                {/* <button onClick={handleSync}>sofsdof</button> */}
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                  {selectedProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group relative cursor-pointer"
                      onClick={() => {
                        setSelectedMenu(product);
                        //   setShowMenuModal(true);
                      }}
                    >
                      <img
                        alt={product.name}
                        src={`images/products/${product.menuType}/${product.imageSrc}`}
                        className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-[7/8]"
                      />
                      <div className="mt-4">
                        <h3 className="text-md text-sarkara-sign-1 font-bold">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </h3>
                        <p className="md:text-md text-sarkara-sign mt-1 text-lg font-bold">
                          {formatToIDR(product.price)}
                        </p>
                        <p className="mt-1 text-sm capitalize text-gray-500">
                          {product.menuType === "food"
                            ? "Food & Snacks "
                            : product.menuType === "others"
                              ? "Tea & Squash & Others"
                              : product.menuType}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* <button
                  onClick={() => setShowOrderList(true)}
                  className="bg-sarkara-sign-1 hover:bg-sarkara-sign fixed bottom-8 right-8 rounded-full px-4 py-4 font-bold text-white shadow-lg"
                >
                  <ShoppingBagIcon width={24} height={24} />
                </button> */}
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default MenuListPageContent;
