"use client";

import { useState } from "react";
import { validateProject } from "@/lib/validateProject";

const STATUS_OPTIONS = ["Planning", "In Progress", "On Hold", "Completed"];
const PRIORITY_OPTIONS = ["Low", "Medium", "High"];

function buildInitialState(project) {
  return {
    clientName: project?.clientName ?? "",
    projectName: project?.projectName ?? "",
    description: project?.description ?? "",
    status: project?.status ?? "Planning",
    priority: project?.priority ?? "Medium",
    startDate: project?.startDate ?? "",
    dueDate: project?.dueDate ?? "",
  };
}

function inputClass(hasError) {
  return `w-full rounded-md border px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500 ${
    hasError ? "border-red-400" : "border-slate-300"
  }`;
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-medium text-slate-700">
      {label}
      {children}
      {error && <span className="text-xs font-normal text-red-600">{error}</span>}
    </label>
  );
}

export default function ProjectForm({ project, onSubmit, onCancel }) {
  const isEditMode = Boolean(project);
  const [formData, setFormData] = useState(() => buildInitialState(project));
  const [errors, setErrors] = useState({});

  function handleChange(field) {
    return (e) => {
      const { value } = e.target;
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        if (!(field in prev)) return prev;
        const next = { ...prev };
        delete next[field];
        return next;
      });
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateProject(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    onSubmit(isEditMode ? { ...formData, id: project.id } : formData);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <h2
        id="project-form-title"
        className="text-lg font-semibold text-slate-900"
      >
        {isEditMode ? "Edit Project" : "New Project"}
      </h2>

      <Field label="Client Name" error={errors.clientName}>
        <input
          type="text"
          required
          value={formData.clientName}
          onChange={handleChange("clientName")}
          className={inputClass(errors.clientName)}
        />
      </Field>

      <Field label="Project Name" error={errors.projectName}>
        <input
          type="text"
          required
          value={formData.projectName}
          onChange={handleChange("projectName")}
          className={inputClass(errors.projectName)}
        />
      </Field>

      <Field label="Description">
        <textarea
          rows={3}
          value={formData.description}
          onChange={handleChange("description")}
          className={inputClass(false)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Status" error={errors.status}>
          <select
            required
            value={formData.status}
            onChange={handleChange("status")}
            className={inputClass(errors.status)}
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Priority" error={errors.priority}>
          <select
            required
            value={formData.priority}
            onChange={handleChange("priority")}
            className={inputClass(errors.priority)}
          >
            {PRIORITY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Start Date" error={errors.startDate}>
          <input
            type="date"
            required
            value={formData.startDate}
            onChange={handleChange("startDate")}
            className={inputClass(errors.startDate)}
          />
        </Field>

        <Field label="Due Date" error={errors.dueDate}>
          <input
            type="date"
            required
            value={formData.dueDate}
            onChange={handleChange("dueDate")}
            className={inputClass(errors.dueDate)}
          />
        </Field>
      </div>

      <div className="mt-2 flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          {isEditMode ? "Save Changes" : "Create Project"}
        </button>
      </div>
    </form>
  );
}
