import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen h-full w-full grid grid-cols-12">
      <aside className="col-span-4 w-full h-full"></aside>
      <div className="col-span-8 w-full h-full">{children}</div>
    </div>
  );
}
