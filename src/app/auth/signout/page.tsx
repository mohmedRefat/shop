import { useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignOutPage() {
  const router = useRouter();
  useEffect(() => {
    signOut({ redirect: false });
    router.push('/');
  }, [router]);
  return <div>Signing out...</div>;
} 