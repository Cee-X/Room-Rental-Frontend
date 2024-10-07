
import LoginForm from '@/components/auth/login';
import { Metadata } from 'next';
export const metadata : Metadata  = {
  title : 'Login'
}
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[500px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
      </div>
    </main>
  );
}