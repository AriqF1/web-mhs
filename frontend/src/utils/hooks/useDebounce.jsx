import { useState, useEffect } from "react";

/**
 * Custom hook untuk menunda pembaruan sebuah nilai.
 * Sangat berguna untuk input pencarian agar tidak memanggil API pada setiap ketikan.
 * @param {any} value Nilai yang ingin ditunda.
 * @param {number} delay Waktu tunda dalam milidetik.
 * @returns {any} Nilai yang sudah ditunda.
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Atur timer untuk memperbarui nilai setelah delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Bersihkan timer jika `value` atau `delay` berubah
    // Ini mencegah nilai diperbarui jika user terus mengetik
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
