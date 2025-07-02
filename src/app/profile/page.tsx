import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchOrders = async (userId: number) => {
  // Dummy fetch for order history
  // Replace with real API call if available
  return [
    { id: 1, product: 'Product A', date: '2024-06-01' },
    { id: 2, product: 'Product B', date: '2024-06-02' },
  ];
};

export default function ProfilePage() {
  const { data: session } = useSession();
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState((session?.user as any)?.username || '');
  const [email, setEmail] = useState(session?.user?.email || '');

  const { data: orders } = useQuery({
    queryKey: ['orders', (session?.user as any)?.id],
    queryFn: () => fetchOrders((session?.user as any)?.id),
    enabled: !!(session?.user as any)?.id,
  });

  const handleSave = () => {
    // Implement profile update logic here
    setEditing(false);
  };

  if (!session) return <div>Please log in to view your profile.</div>;

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 32 }}>
      <h2>User Profile</h2>
      <div>
        <label>Username:</label>
        {editing ? (
          <input value={username} onChange={e => setUsername(e.target.value)} />
        ) : (
          <span>{username}</span>
        )}
      </div>
      <div>
        <label>Email:</label>
        {editing ? (
          <input value={email} onChange={e => setEmail(e.target.value)} />
        ) : (
          <span>{email}</span>
        )}
      </div>
      {editing ? (
        <button onClick={handleSave}>Save</button>
      ) : (
        <button onClick={() => setEditing(true)}>Edit Profile</button>
      )}
      <h3>Order History</h3>
      <ul>
        {orders?.map((order: any) => (
          <li key={order.id}>{order.product} - {order.date}</li>
        ))}
      </ul>
    </div>
  );
} 