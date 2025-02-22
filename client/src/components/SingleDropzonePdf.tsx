import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react";

interface SingleDropzonePdfProps {
  onFileSelect: (file: File | null) => void;
  initialFileUrl?: string;
  preview: boolean;
  setPreview: any;
}

export function SingleDropzonePdf({
  onFileSelect,
  initialFileUrl,
  preview,
  setPreview,
}: SingleDropzonePdfProps) {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(initialFileUrl || null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const pdfUrl = URL.createObjectURL(file);
      setPdfFile(file);
      setFileUrl(pdfUrl);
      onFileSelect(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
  });

  const handleClearPdf = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPdfFile(null);
    setFileUrl(null);
    onFileSelect(null);
  };

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`p-4 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        {fileUrl ? (
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">
                {pdfFile ? pdfFile.name : "View Uploaded Resume"}
              </span>
              <button
                onClick={handleClearPdf}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
              >
                <X
                  onClick={() => {
                    setPreview(!preview);
                  }}
                  size={16}
                />
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Drag & drop or click to upload a new PDF
            </p>
          </div>
        ) : (
          <p className="text-gray-600">
            {isDragActive
              ? "Drop the PDF here..."
              : "Drag & drop or click to upload a PDF"}
          </p>
        )}
      </div>
    </div>
  );
}

export default SingleDropzonePdf;
