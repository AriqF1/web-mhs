import { useQuery } from "@tanstack/react-query";
import { getAllMataKuliah } from "../apis/MatkulApi";

export const useMatkul = () =>
  useQuery({
    queryKey: ["matkul"],
    queryFn: getAllMataKuliah,
    select: (res) => res?.data ?? [],
  });
