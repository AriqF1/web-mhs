import Swal from "sweetalert2";

export const showCanceled = () => {
  Swal.fire({
    title: "Dibatalkan!",
    text: "Data tidak dihapus",
    icon: "info",
  });
};

export const showSuccess = () => {
  Swal.fire({
    title: "Dihapus!",
    text: "Data telah dihapus",
    icon: "success",
  });
};
