import { toast } from "react-toastify";

export const ToastSuccess = (message: string) =>
  toast.success(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "dark",
  });

export const ToastError = (message: string) =>
  toast.error(message, {
    position: "top-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    theme: "dark",
  });
