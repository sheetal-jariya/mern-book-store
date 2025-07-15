import { toast } from "react-toastify";

const options = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light",
};

const toastService = {
  success: (msg) => toast.success(msg, options),
  error: (msg) => toast.error(msg, options),
  warning: (msg) => toast.warning(msg, options),
  info: (msg) => toast.info(msg, options),
};

export default toastService;
