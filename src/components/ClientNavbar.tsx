'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ClientNavbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/category", label: "Category" },
    { href: "/cart", label: "Cart" }
  ];

  return (
    <ul className="flex space-x-4 items-center">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={
              pathname === link.href || pathname.startsWith(link.href + "/")
                ? "underline text-blue-400"
                : ""
            }
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
