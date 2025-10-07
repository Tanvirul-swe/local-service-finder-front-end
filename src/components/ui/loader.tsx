import React from "react";

interface LoaderProps {
  size?: number; // spinner size in px
  message?: string; // optional loading text
}

const Loader: React.FC<LoaderProps> = ({ size = 60, message }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen">
      <div
        className="rounded-full border-4 border-t-primary border-r-primary border-b-gray-200 border-l-gray-200 animate-spin"
        style={{ width: size, height: size }}
      ></div>
      {message && <p className="mt-4 text-muted-foreground text-lg">{message}</p>}
    </div>
  );
};

export default Loader;
