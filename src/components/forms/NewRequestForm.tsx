'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { requestSchema, RequestSchema } from '../../lib/schemas';
import { useState, BaseSyntheticEvent } from 'react';

interface Props {
  dict: Record<string, string>;
}

export function NewRequestForm({ dict }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<RequestSchema>({ resolver: zodResolver(requestSchema) });
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (_values: RequestSchema, event?: BaseSyntheticEvent) => {
    const formData = new FormData(event?.target as HTMLFormElement);
    setMessage(null);
    const response = await fetch('/api/requests', {
      method: 'POST',
      body: formData
    });
    if (response.ok) {
      setMessage(dict['form.success']);
      reset();
    } else {
      const data = await response.json().catch(() => ({}));
      setMessage(data.error ?? dict['form.error']);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm text-gray-800" encType="multipart/form-data">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span>{dict['filters.type']}</span>
          <select {...register('type')} className="rounded border border-gray-300 px-2 py-1">
            <option value="FOOD">{dict['request.type.FOOD']}</option>
            <option value="WATER">{dict['request.type.WATER']}</option>
            <option value="MEDICAL">{dict['request.type.MEDICAL']}</option>
            <option value="SHELTER">{dict['request.type.SHELTER']}</option>
            <option value="CONNECTIVITY">{dict['request.type.CONNECTIVITY']}</option>
            <option value="OTHER">{dict['request.type.OTHER']}</option>
          </select>
          {errors.type && <span className="text-xs text-red-600">{errors.type.message}</span>}
        </label>
        <label className="flex flex-col gap-1">
          <span>{dict['request.commune']}</span>
          <input {...register('commune')} className="rounded border border-gray-300 px-2 py-1" />
          {errors.commune && <span className="text-xs text-red-600">{errors.commune.message}</span>}
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span>{dict['request.description']}</span>
        <textarea {...register('description')} rows={4} className="rounded border border-gray-300 px-2 py-1" />
        {errors.description && <span className="text-xs text-red-600">{errors.description.message}</span>}
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span>{dict['request.lat']}</span>
          <input {...register('lat')} className="rounded border border-gray-300 px-2 py-1" />
        </label>
        <label className="flex flex-col gap-1">
          <span>{dict['request.lng']}</span>
          <input {...register('lng')} className="rounded border border-gray-300 px-2 py-1" />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span>{dict['request.contactEmail']}</span>
          <input {...register('contactEmail')} className="rounded border border-gray-300 px-2 py-1" />
        </label>
        <label className="flex flex-col gap-1">
          <span>{dict['request.contactPhone']}</span>
          <input {...register('contactPhone')} className="rounded border border-gray-300 px-2 py-1" />
          {errors.contactPhone && <span className="text-xs text-red-600">{errors.contactPhone.message}</span>}
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span>{dict['request.contactName']}</span>
        <input {...register('contactName')} className="rounded border border-gray-300 px-2 py-1" />
        {errors.contactName && <span className="text-xs text-red-600">{errors.contactName.message}</span>}
      </label>
      <label className="flex flex-col gap-1">
        <span>Foto (<=1MB)</span>
        <input type="file" name="photo" accept="image/*" className="rounded border border-gray-300 px-2 py-1" />
      </label>
      <label className="flex items-center gap-2 text-xs">
        <input type="checkbox" {...register('consent')} /> {dict['request.consent']}
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded border border-gray-300 bg-gray-900 px-4 py-2 text-sm text-white"
      >
        {dict['form.submit']}
      </button>
      {message && <p className="text-xs text-gray-700">{message}</p>}
    </form>
  );
}
