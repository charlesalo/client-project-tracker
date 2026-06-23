"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectList from "@/components/ProjectList";
import DashboardSummary from "@/components/DashboardSummary";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { getProjects, saveProjects } from "@/lib/storage";
import { VALID_STATUSES, VALID_PRIORITIES } from "@/lib/validateProject";
import seedData from "@/data/test_data.json";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(undefined);
  const [deletingProject, setDeletingProject] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

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

  function openCreateForm() {
    setEditingProject(undefined);
    setIsFormOpen(true);
  }

  function openEditForm(project) {
    setEditingProject(project);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
  }

  function handleFormSubmit(data) {
    const nextProjects = data.id
      ? projects.map((p) => (p.id === data.id ? { ...p, ...data } : p))
      : [
          ...projects,
          {
            ...data,
            id:
              projects.length > 0
                ? Math.max(...projects.map((p) => p.id)) + 1
                : 1,
          },
        ];

    setProjects(nextProjects);

    try {
      saveProjects(nextProjects);
    } catch {
      setStatus("error");
    }

    setIsFormOpen(false);
  }

  function openDeleteDialog(project) {
    setDeletingProject(project);
  }

  function closeDeleteDialog() {
    setDeletingProject(undefined);
  }

  function handleDeleteConfirm() {
    const nextProjects = projects.filter((p) => p.id !== deletingProject.id);

    setProjects(nextProjects);

    try {
      saveProjects(nextProjects);
    } catch {
      setStatus("error");
    }

    setDeletingProject(undefined);
  }

  const query = searchQuery.trim().toLowerCase();
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      query === "" ||
      project.clientName.toLowerCase().includes(query) ||
      project.projectName.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "All" || project.status === statusFilter;
    const matchesPriority =
      priorityFilter === "All" || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-900">
          Client Project Tracker
        </h1>
        {status === "ready" && (
          <button
            type="button"
            onClick={openCreateForm}
            className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
          >
            New Project
          </button>
        )}
      </div>

      {status === "ready" && (
        <div className="mt-4">
          <DashboardSummary projects={projects} />
        </div>
      )}

      {status === "ready" && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by client or project name…"
            className="min-w-[200px] flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="All">All Statuses</option>
            {VALID_STATUSES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="All">All Priorities</option>
            {VALID_PRIORITIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="mt-6">
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState onRetry={handleRetry} />}
        {status === "ready" && projects.length === 0 && (
          <EmptyState onCreateClick={openCreateForm} />
        )}
        {status === "ready" &&
          projects.length > 0 &&
          filteredProjects.length === 0 && (
            <p className="rounded-lg border border-dashed border-slate-300 px-6 py-12 text-center text-sm text-slate-500">
              No projects match your search/filters.
            </p>
          )}
        {status === "ready" && filteredProjects.length > 0 && (
          <ProjectList
            projects={filteredProjects}
            onEdit={openEditForm}
            onDelete={openDeleteDialog}
          />
        )}
      </div>

      {isFormOpen && (
        <Modal onClose={closeForm} labelledBy="project-form-title">
          <ProjectForm
            project={editingProject}
            onSubmit={handleFormSubmit}
            onCancel={closeForm}
          />
        </Modal>
      )}

      {deletingProject && (
        <Modal onClose={closeDeleteDialog} labelledBy="delete-confirm-title">
          <DeleteConfirmDialog
            project={deletingProject}
            onConfirm={handleDeleteConfirm}
            onCancel={closeDeleteDialog}
          />
        </Modal>
      )}
    </main>
  );
}
