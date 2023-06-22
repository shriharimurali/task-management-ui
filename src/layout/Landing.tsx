import { FC } from "react";

type Props = {
  children?: React.ReactNode;
};

export const LandingLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex w-full h-screen">
      <div className="flex items-center justify-center w-1/2 h-screen">
        {children}
      </div>
      <div className="w-1/2 h-screen bg-indigo-400">awdawd</div>
    </div>
  );
};
