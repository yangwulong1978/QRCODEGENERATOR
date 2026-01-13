'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { qrFormSchema, QRFormSchema } from '@/lib/validation';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface QRFormProps {
  onGenerate: (data: QRFormSchema) => void;
  onClear: () => void;
  isLoading: boolean;
}

export default function QRForm({ onGenerate, onClear, isLoading }: QRFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QRFormSchema>({
    resolver: zodResolver(qrFormSchema),
  });

  const onSubmit = (data: QRFormSchema) => {
    onGenerate(data);
  };

  const handleClear = () => {
    reset();
    onClear();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Enter Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Company Name"
          placeholder="Enter company name"
          {...register('CompanyName')}
          error={errors.CompanyName?.message}
          required
        />

        <Input
          label="Temporary Token"
          placeholder="Enter temporary token"
          {...register('TemporaryToken')}
          error={errors.TemporaryToken?.message}
          required
        />

        <Input
          label="Base API URL"
          type="url"
          placeholder="https://api.example.com"
          {...register('BASEAPIURL')}
          error={errors.BASEAPIURL?.message}
          required
        />

        <div className="flex gap-4 mt-6">
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="flex-1"
          >
            Generate QR Code
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClear}
            disabled={isLoading}
          >
            Clear
          </Button>
        </div>
      </form>
    </div>
  );
}
