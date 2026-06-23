"use client";

import { useState } from "react";
import ProjectList from "@/components/ProjectList";
import seedData from "@/data/test_data.json";

export default function Home() {
  const [projects] = useState(seedData);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">
        Client Project Tracker
      </h1>
      <div className="mt-6">
        <ProjectList projects={projects} />
      </div>
    </main>
  );
}
