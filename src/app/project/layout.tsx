"use client";

import Spinner from "@/components/Spinner";
import { Suspense } from "react";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<Spinner />}>{children}</Suspense>;
}
