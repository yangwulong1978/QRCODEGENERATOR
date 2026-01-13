'use client';

import { useState } from 'react';
import QRForm from './components/QRForm';
import QRPreview from './components/QRPreview';
import { generateQRCode } from '@/lib/qr-generator';
import { QRFormData, QRCodeData } from '@/lib/types';

export default function Home() {
  const [qrData, setQrData] = useState<QRCodeData | null>(null);
  const [formData, setFormData] = useState<QRFormData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async (data: QRFormData) => {
    setIsGenerating(true);
    try {
      const result = await generateQRCode(data);
      setQrData(result);
      setFormData(data);
    } catch (error) {
      console.error('QR generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClear = () => {
    setQrData(null);
    setFormData(null);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Uniware QR Code Generator
          </h1>
          <p className="text-lg text-gray-600">
            Generate QR codes for your company information
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <QRForm
            onGenerate={handleGenerate}
            onClear={handleClear}
            isLoading={isGenerating}
          />

          {qrData && formData && (
            <QRPreview
              dataUrl={qrData.dataUrl}
              jsonString={qrData.jsonString}
              companyName={formData.CompanyName}
            />
          )}

          {!qrData && (
            <div className="hidden lg:flex items-center justify-center bg-white rounded-xl shadow-lg p-8">
              <div className="text-center text-gray-400">
                <svg
                  className="mx-auto h-32 w-32 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                  />
                </svg>
                <p className="text-xl font-medium">Your QR code will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
