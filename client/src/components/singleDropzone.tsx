import React from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";

interface SingleDropzoneProps {
  onFileSelect: (file: File | null) => void;
  preview: string | null;
  setPreview: (file: string | null) => void;
}

export function SingleDropzone({
  onFileSelect,
  preview,
  setPreview,
}: SingleDropzoneProps) {
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onFileSelect(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg", ".webp"],
    },
    maxFiles: 1,
  });

  const handleClearPreview = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div
        {...getRootProps()}
        className="relative aspect-square w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
      >
        <input {...getInputProps()} />
        <div className="absolute inset-0 flex items-center justify-center">
          {preview ? (
            <div className="relative w-full h-1/3 p-2">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleClearPreview}
                className="absolute top-1 right-1 p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 shadow-sm transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center p-4">
              {isDragActive ? (
                <p className="text-gray-500">Drop the file here...</p>
              ) : (
                <div className="space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500">
                    Drag & drop or click to upload
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleDropzone;
