export const VALID_STATUSES = ["Planning", "In Progress", "On Hold", "Completed"];
export const VALID_PRIORITIES = ["Low", "Medium", "High"];

export function validateProject(project) {
  const errors = {};

  if (!project.clientName || !project.clientName.trim()) {
    errors.clientName = "Client name is required.";
  }

  if (!project.projectName || !project.projectName.trim()) {
    errors.projectName = "Project name is required.";
  }

  if (!project.status) {
    errors.status = "Status is required.";
  } else if (!VALID_STATUSES.includes(project.status)) {
    errors.status = `Status must be one of: ${VALID_STATUSES.join(", ")}.`;
  }

  if (!project.priority) {
    errors.priority = "Priority is required.";
  } else if (!VALID_PRIORITIES.includes(project.priority)) {
    errors.priority = `Priority must be one of: ${VALID_PRIORITIES.join(", ")}.`;
  }

  if (!project.startDate) {
    errors.startDate = "Start date is required.";
  }

  if (!project.dueDate) {
    errors.dueDate = "Due date is required.";
  }

  if (
    project.startDate &&
    project.dueDate &&
    new Date(project.dueDate) < new Date(project.startDate)
  ) {
    errors.dueDate = "Due date cannot be earlier than the start date.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
