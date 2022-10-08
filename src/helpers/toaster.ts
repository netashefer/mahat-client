import { toast, ToastOptions } from 'react-toastify';
const commonSettings: Partial<ToastOptions> = {
    position: "bottom-right",
    theme: "colored",
    pauseOnHover: false
};
export const notifyError = (text: string) => toast(text, { type: "error", ...commonSettings });
export const notifyInfo = (text: string) => toast(text, { type: "info", ...commonSettings });
export const notifySuccess = (text: string) => toast(text, { type: "success", ...commonSettings });
