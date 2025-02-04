import { useState } from "react";
import { Label } from "@/components/ui/label";
import { CircleX } from "lucide-react";

interface ImageUploadProps {
  id: string;
  onChange: (file: File | null) => void;
}

export function ImageUpload({ id, onChange }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
    onChange(file);
  };

  const handleClearPreview = () => {
    setPreview(null);
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>Job Image</Label>
      <div className="flex items-center justify-center w-1/3">
        <label
          htmlFor={id}
          className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
        >
          {preview ? (
            <div className="px-4 relative w-full h-2/3">
              <img
                src={preview}
                alt="Preview"
                className="w-24 h-auto  object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleClearPreview}
                className="absolute top-[-10px] left-24  p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
              >
                <CircleX className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-gray-500">
              <span className="text-sm">Drag & drop or click to upload</span>
            </div>
          )}
          <input
            id={id}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
}
