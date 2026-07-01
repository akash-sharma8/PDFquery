'use client'

import { ChangeEvent, FormEvent,useState } from 'react';

interface UploadStatus {
  type: "success" | "error";
  message: string;
}

export default function UploadForm() {
  const [fileName, setFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>):void => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsUploading(true);
    setUploadStatus(null);
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data: { message?: string } = await response.json();
      if (response.ok) {
        
        setUploadStatus({
          type: 'success', message:
            data.message || 'File uploaded successfully!'
        });

        setFileName('');
        form.reset();
      } else {
        setUploadStatus({ type: 'error', message: 'Upload failed. Please try again.' });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setUploadStatus({ type: 'error', message });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-1">Upload File</h2>
      <p className="text-sm text-gray-500 mb-6">File must be under 10MB.</p>

      <form onSubmit={handleUpload} className="space-y-4">
        {/* Custom File Input Wrapper */}
        <div className="relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer group">
          <input
            type="file"
            name="file"
            required
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />

          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            {/* Upload Icon */}
            <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-blue-500 transition-colors" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>

            {fileName ? (
              <p className="text-sm font-medium text-blue-600 truncate max-w-xs">
                Selected: {fileName}
              </p>
            ) : (
              <>
                <p className="text-sm text-gray-600 font-medium">
                  Click to upload <span className="text-blue-500">or drag and drop</span>
                </p>
                <p className="text-xs text-gray-400 mt-1">PDF</p>
              </>
            )}
          </div>
        </div>

        {/* Status Messages */}
        {uploadStatus && (
          <div className={`p-3 rounded-lg text-sm font-medium text-center ${uploadStatus.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
            {uploadStatus.message}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm text-white shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isUploading
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
        >
          {isUploading ? (
            <span className="flex items-center justify-center gap-2">
              {/* Spinner Icon */}
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Uploading...
            </span>
          ) : 'Upload'}
        </button>
      </form>
      <a
        href="/chat"
        className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Start Chatting →
      </a>
    </div>
  );
}