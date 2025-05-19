'use client';

import { useState } from 'react';
import toastr from 'toastr';
import { signUp } from '@/lib/auth';
import '@/styles/components/auth.scss';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await signUp(email, password);
      toastr.success('회원가입 성공! 로그인하세요.');
    } catch (err) {
      if (err instanceof Error) {
        setError(`회원가입 실패: ${err.message}`);
      } else {
        setError('회원가입 실패. 다시 시도하세요.');
      }
    }
  };

  return (
    <>
      <h2>회원가입</h2>
      <form onSubmit={handleSignUp} className='auth-form'>
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
        <button type='submit'>이메일 회원가입</button>
        {error && <p className='auth-error'>{error}</p>}
      </form>
    </>
  );
}