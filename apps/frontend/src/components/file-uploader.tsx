import React, { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import { useUploadFile } from '../mutations/upload-file';
import { queries } from '../api';

export const FileUploader = () => {
  const { mutate, isPending, error } = useUploadFile();
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    disabled: isPending,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      }
    },
  });

  const handleUpload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!file) return;

    mutate(file, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queries.files._def });
        setFile(null);
      },
      onError: (err) => console.log(err),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded cursor-pointer transition-colors ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input  {...getInputProps()} />

        <div className="text-center text-gray-500">
          {file ? (
            <p>Выбран файл: <span className="font-semibold text-gray-700">{file.name}</span></p>
          ) : isDragActive ? (
            <p className="text-blue-500">Бросайте файл сюда!</p>
          ) : (
            <p>Перетащите файл сюда или кликните для выбора</p>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">Ошибка загрузки файла</p>}

      <button
        onClick={handleUpload}
        disabled={!file || isPending}
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded disabled:bg-gray-400 disabled:hover:bg-gray-400 transition-colors"
      >
        {isPending ? 'Загрузка...' : 'Загрузить в облако'}
      </button>
    </div>
  );
};
