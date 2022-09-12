import { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{}>;

export const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="flex-1 flex flex-col justify-between">{children}</div>;
};
