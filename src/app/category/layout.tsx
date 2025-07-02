export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-4 border rounded-xl border-blue-500 m-4">
      <h2 className="text-xl font-bold text-blue-600">Category Layout</h2>
      <div>{children}</div>
    </section>
  );
}
