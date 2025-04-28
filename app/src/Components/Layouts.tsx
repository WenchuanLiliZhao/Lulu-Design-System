import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const BasicLayout = ({ children }: LayoutProps) => {
  return (
    <>
      {children}
      <footer className="bg-gray-800 text-white p-4"></footer>
    </>
  );
};
