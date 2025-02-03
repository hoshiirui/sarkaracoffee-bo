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

const PromoListPageContent = () => {
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Daftar Promo" />
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <p>daftar promo</p>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default PromoListPageContent;
