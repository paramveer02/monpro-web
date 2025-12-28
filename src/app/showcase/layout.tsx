"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function ShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    // Prevent double-execution in dev strict mode
    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;

    const marker = sessionStorage.getItem("monpro_submission_success");
    if (!marker) {
      console.warn("[Security] No submission marker - redirecting to home");
      router.push("/");
      return;
    }
    setIsAuthorized(true);
  }, [router]);

  if (!isAuthorized) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}

