import { MakeApprove } from "@/utils/models/register";
import React from "react";

export default async function ApprovePage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params.id);
  let message = "User not found";
  const res = await fetch("https://test-git-master-atakaneliz.vercel.app/api/auth/approve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: params.id,
    }),
  });
  const data = await res.json();
  console.log(data);
  message = data.message;
  return (
    <>
      <div className="flex flex-col w-full h-full min-h-screen bg-[#f5f5f5] text-[#252525] items-center justify-center">
        <p className="text-2xl font-medium">{message}</p>
      </div>
    </>
  );
}
