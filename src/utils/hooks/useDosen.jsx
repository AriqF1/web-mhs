import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllDosen,
  storeDosen,
  updateDosen,
  deleteDosen,
} from "../apis/DosenApi";
import { toastSuccess, toastError } from "@/utils/utility";

// Query to get all dosen
export const useDosen = () => {
  return useQuery({
    queryKey: ["dosen"],
    queryFn: getAllDosen,
    onError: (error) => {
      toastError(error.message || "Failed to fetch dosen.");
    },
  });
};

// Mutation to store a new dosen
export const useStoreDosen = () => {
  return useMutation({
    mutationFn: storeDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Dosen added successfully!");
    },
    onError: (error) => {
      toastError(error.message || "Failed to add dosen.");
    },
  });
};

// Mutation to update an existing dosen
export const useUpdateDosen = () => {
  return useMutation({
    mutationFn: updateDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Dosen updated successfully!");
    },
    onError: (error) => {
      toastError(error.message || "Failed to update dosen.");
    },
  });
};

// Mutation to delete a dosen
export const useDeleteDosen = () => {
  return useMutation({
    mutationFn: deleteDosen,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dosen"] });
      toastSuccess("Dosen deleted successfully!");
    },
    onError: (error) => {
      toastError(error.message || "Failed to delete dosen.");
    },
  });
};
