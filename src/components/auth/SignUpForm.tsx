import { signup } from "@/lib/auth";
import { useState } from "react";
import "@/styles/components/auth.scss";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await signup(email, password);
      alert("회원가입 성공! 로그인하세요.");
    } catch (error) {
      console.error("회원가입 실패:", error);
      setError("회원가입 실패. 다시 시도해주세요.");
    }
  };
  return (
    <form onSubmit={handleSignUp} className="auth-form">
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">회원가입</button>
      {error && <p className="auth-error">{error}</p>}
    </form>
  );
}
