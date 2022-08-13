import React, { FC } from "react";

type ILayoutProps = {
  children: React.ReactNode;
};

const Layout: FC<ILayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
