export class AppError extends Error {
  code: string;
  status: number;

  constructor(message: string, code = "APP_ERROR", status = 500) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.status = status;
  }
}

export class ValidationError extends AppError {
  fieldErrors?: Record<string, string>;

  constructor(message = "Validation failed", fieldErrors?: Record<string, string>) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";

    if (fieldErrors) {
      this.fieldErrors = fieldErrors;
    }
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, "NOT_FOUND", 404);
    this.name = "NotFoundError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, "UNAUTHORIZED", 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, "FORBIDDEN", 403);
    this.name = "ForbiddenError";
  }
}

export class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, "CONFLICT", 409);
    this.name = "ConflictError";
  }
}

export class ItemInUseError extends AppError {
  constructor(message = "This item is still used somewhere else") {
    super(message, "ITEM_IN_USE", 409);
    this.name = "ItemInUseError";
  }
}