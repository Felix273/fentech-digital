export type ContactPayload = {
  firstName: string;
  lastName: string;
  email: string;
  serviceRequired: string;
  message: string;
  company?: string;
  phone?: string;
  priority?: string;
  website?: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(input: unknown):
  | { success: true; data: ContactPayload }
  | { success: false; errors: ContactErrors } {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { success: false, errors: { message: "Invalid request." } };
  }

  const value = input as Record<string, unknown>;
  const data: ContactPayload = {
    firstName: stringValue(value.firstName),
    lastName: stringValue(value.lastName),
    email: stringValue(value.email).toLowerCase(),
    serviceRequired: stringValue(value.serviceRequired) || "General enquiry",
    message: stringValue(value.message),
    company: stringValue(value.company),
    phone: stringValue(value.phone),
    priority: stringValue(value.priority) || "medium",
    website: stringValue(value.website),
  };
  const errors: ContactErrors = {};

  if (data.firstName.length < 2 || data.firstName.length > 80) {
    errors.firstName = "First name must be between 2 and 80 characters.";
  }
  if (data.lastName.length < 2 || data.lastName.length > 80) {
    errors.lastName = "Last name must be between 2 and 80 characters.";
  }
  if (!emailPattern.test(data.email) || data.email.length > 254) {
    errors.email = "Enter a valid email address.";
  }
  if (data.serviceRequired.length > 120) {
    errors.serviceRequired = "Service selection is too long.";
  }
  if (data.message.length < 10 || data.message.length > 5000) {
    errors.message = "Message must be between 10 and 5,000 characters.";
  }
  if ((data.company?.length ?? 0) > 120) {
    errors.company = "Company name is too long.";
  }
  if ((data.phone?.length ?? 0) > 40) {
    errors.phone = "Phone number is too long.";
  }

  return Object.keys(errors).length
    ? { success: false, errors }
    : { success: true, data };
}

function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] ?? character,
  );
}
