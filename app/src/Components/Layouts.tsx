import { ReactNode } from "react";
import { Nav } from "./Nav";

interface LayoutProps {
  children: ReactNode;
}

export const BasicLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <Nav
        items={{
          left: [
            <div key="left">Left Item</div>,
            <div key="left">Left Item</div>,
          ],
          middle: [
            <div key="middle">Middle Item</div>,
            <div key="middle">Middle Item</div>,
          ],
          right: [
            <div key="right">Right Item</div>,
            <div key="right">Right Item</div>,
          ],
        }}
      />
      {children}
      <footer className="bg-gray-800 text-white p-4"></footer>
    </>
  );
};
