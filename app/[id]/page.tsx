import { MakeApprove } from "@/utils/models/register";
import React from "react";

export default async function ApprovePage({
  params,
}: {
  params: { id: string };
}) {
  console.log(params.id);
  let message = "User not found";
  const user = await MakeApprove(params.id);

  return (
    <>
      <div className="flex flex-col w-full h-full min-h-screen bg-[#f5f5f5] text-[#252525] items-center justify-center">
        {message}
      </div>
    </>
  );
}
