import React from "react";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export const Modal: React.FC<Props> = ({ children }) => {
  return <div>{children}</div>;
};
