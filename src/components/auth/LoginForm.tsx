'use client';

import { useState } from 'react';
import { signIn } from '@/lib/auth';
import '@/styles/components/auth.scss';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      if (err instanceof Error) {
        setError(`로그인 실패: ${err.message}`);
      } else {
        setError('로그인 실패. 다시 시도하세요.');
      }
    }
  };

  return (
    <>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className='auth-form'>
        <input
          type='email'
          placeholder='이메일'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='비밀번호'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>이메일 로그인</button>
        {error && <p className='auth-error'>{error}</p>}
      </form>
    </>
  );
}