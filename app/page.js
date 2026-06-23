"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectList from "@/components/ProjectList";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { getProjects, saveProjects } from "@/lib/storage";
import seedData from "@/data/test_data.json";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  const loadProjects = useCallback(() => {
    setTimeout(() => {
      try {
        const stored = getProjects();
        if (stored !== null) {
          setProjects(stored);
        } else {
          setProjects(seedData);
          saveProjects(seedData);
        }
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }, 500);
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  const handleRetry = useCallback(() => {
    setStatus("loading");
    loadProjects();
  }, [loadProjects]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-semibold text-slate-900">
        Client Project Tracker
      </h1>
      <div className="mt-6">
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState onRetry={handleRetry} />}
        {status === "ready" && projects.length === 0 && <EmptyState />}
        {status === "ready" && projects.length > 0 && (
          <ProjectList projects={projects} />
        )}
      </div>
    </main>
  );
}
