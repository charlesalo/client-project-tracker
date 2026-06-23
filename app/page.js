"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectList from "@/components/ProjectList";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { getProjects, saveProjects } from "@/lib/storage";
import seedData from "@/data/test_data.json";

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(undefined);
  const [deletingProject, setDeletingProject] = useState(undefined);

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

      <div className="mt-6">
        {status === "loading" && <LoadingState />}
        {status === "error" && <ErrorState onRetry={handleRetry} />}
        {status === "ready" && projects.length === 0 && (
          <EmptyState onCreateClick={openCreateForm} />
        )}
        {status === "ready" && projects.length > 0 && (
          <ProjectList
            projects={projects}
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
