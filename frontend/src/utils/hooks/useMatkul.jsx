import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllMataKuliah,
  storeMataKuliah,
  updateMataKuliah,
  deleteMataKuliah,
} from "../apis/MatkulApi";

export const useMatkul = () =>
  useQuery({
    queryKey: ["matkul"],
    queryFn: getAllMataKuliah,
    select: (res) => res?.data ?? [],
  });

export const useStoreMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: storeMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matkul"] });
      toast.success("Mata kuliah berhasil ditambahkan!");
    },
    onError: (error) =>
      toast.error(`Gagal menambahkan mata kuliah: ${error.message}`),
  });
};

export const useUpdateMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateMataKuliah(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matkul"] });
      toast.success("Mata kuliah berhasil diperbarui!");
    },
    onError: (error) =>
      toast.error(`Gagal memperbarui mata kuliah: ${error.message}`),
  });
};

export const useDeleteMatkul = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMataKuliah,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matkul"] });
      toast.success("Mata kuliah berhasil dihapus!");
    },
    onError: (error) =>
      toast.error(`Gagal menghapus mata kuliah: ${error.message}`),
  });
};
