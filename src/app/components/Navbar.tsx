import { useSession, signIn, signOut } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="navbar">
      {/* ...existing nav content... */}
      <div style={{ marginLeft: 'auto' }}>
        {status === 'loading' ? (
          <span>Loading...</span>
        ) : session ? (
          <>
            <span>Welcome, {(session.user as any)?.username || session.user?.email}!</span>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <button onClick={() => signIn()}>Sign in</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 