"use client";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex h-64 flex-col items-center justify-center gap-4">
      <p className="text-sm text-[#6B7280]">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}