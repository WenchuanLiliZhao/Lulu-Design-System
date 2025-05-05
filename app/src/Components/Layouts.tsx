// ingore this file please, it is useless yet
// 请忽略这个文件，它还没有用处

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
