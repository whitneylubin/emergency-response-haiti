'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

interface Props {
  dict: Record<string, string>;
}

export default function LoginForm({ dict }: Props) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false
    });
    if (res?.error) {
      setError(res.error);
    } else {
      setError(null);
      window.location.href = '/admin';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-800">
      <label className="flex flex-col gap-1">
        <span>{dict['auth.email']}</span>
        <input name="email" type="email" required className="rounded border border-gray-300 px-2 py-1" />
      </label>
      <label className="flex flex-col gap-1">
        <span>{dict['auth.password']}</span>
        <input name="password" type="password" required className="rounded border border-gray-300 px-2 py-1" />
      </label>
      <button type="submit" className="rounded border border-gray-300 bg-gray-900 px-4 py-2 text-white">
        {dict['auth.login']}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </form>
  );
}
