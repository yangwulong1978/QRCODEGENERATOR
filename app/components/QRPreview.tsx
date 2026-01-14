'use client';

import React from 'react';
import { Button } from './ui/Button';
import Image from 'next/image';

interface QRPreviewProps {
  dataUrl: string;
  jsonString: string;
  companyName: string;
}

export default function QRPreview({ dataUrl, jsonString, companyName }: QRPreviewProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = dataUrl;
    const sanitizedName = companyName.replace(/[^a-z0-9]/gi, '_');
    link.download = `QR_${sanitizedName}_${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">QR Code Preview</h2>

      <div className="flex flex-col items-center">
        <div className="bg-white p-4 rounded-lg border-2 border-gray-200 mb-6">
          <img
            src={dataUrl}
            alt="Generated QR Code"
            className="w-64 h-64"
          />
        </div>

        <Button
          variant="primary"
          onClick={handleDownload}
          className="w-full mb-6"
        >
          Download QR Code
        </Button>

        <div className="w-full">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Encoded Data:</h3>
          <pre className="bg-gray-50 p-4 rounded-lg text-xs overflow-x-auto border border-gray-200 text-gray-900 font-medium">
            {JSON.stringify(JSON.parse(jsonString), null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
