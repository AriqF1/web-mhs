// Utils/ooks/useKelas.jsx
import { useQuery } from "@tanstack/react-query";
import { getAllKelas } from "../apis/KelasApi";

export const useKelas = () =>
  useQuery({
    queryKey: ["kelas"],
    queryFn: getAllKelas,
    select: (res) => res?.data ?? [],
  });
