import React, { useCallback } from 'react';
import { Camera, X } from 'lucide-react';

interface PhotoUploaderProps {
  avatarUrl: string | null;
  onPhotoChange: (file: File) => void;
  isUploading?: boolean;
}

export default function PhotoUploader({ avatarUrl, onPhotoChange, isUploading }: PhotoUploaderProps) {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onPhotoChange(file);
    }
  }, [onPhotoChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onPhotoChange(file);
    }
  };

  return (
    <div className="flex items-center gap-8">
      <div className="relative group">
        <div className="relative w-24 h-24">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-4 border-white shadow-lg">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          )}
          {avatarUrl && (
            <button
              onClick={() => onPhotoChange(null as any)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
            >
              <X className="w-4 h-4 text-red-600" />
            </button>
          )}
        </div>
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50 flex items-center justify-center cursor-pointer"
        >
          <label className="cursor-pointer text-white text-xs font-medium text-center p-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            {isUploading ? 'Uploading...' : 'Change\nPhoto'}
          </label>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Profile Photo</h3>
        <p className="text-sm text-gray-500 mb-3">
          Add a professional photo to help event organizers recognize you
        </p>
        <div className="flex gap-2 text-sm">
          <label className="btn-secondary cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            Upload new photo
          </label>
          {avatarUrl && (
            <button
              onClick={() => onPhotoChange(null as any)}
              className="text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}