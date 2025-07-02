import { ReactNode } from "react";

export type Product = {
  description: ReactNode;
  category: string;
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};