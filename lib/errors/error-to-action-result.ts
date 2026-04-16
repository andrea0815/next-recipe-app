import { ActionResult } from "@/types/actions";
import {
  AppError,
  ValidationError,
} from "./app-errors";

export function errorToActionResult<
  TFields extends Record<string, string>,
  TData = never
>(
  error: unknown
): ActionResult<TFields, TData> {
  if (error instanceof ValidationError) {
    return {
      success: false,
      message: error.message,
      ...(error.fieldErrors
        ? { fieldErrors: error.fieldErrors as Partial<TFields> }
        : {}),
    };
  }

  if (error instanceof AppError) {
    return {
      success: false,
      message: error.message,
    };
  }

  console.error(error);

  return {
    success: false,
    message: "Something went wrong. Please try again.",
  };
}