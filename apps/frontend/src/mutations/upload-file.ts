import { uploadFile } from '../api/features/files/api';
import { useMutation } from '@tanstack/react-query';

export const useUploadFile = () => {
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return uploadFile(file);
    }
  });

  return mutation;
};
