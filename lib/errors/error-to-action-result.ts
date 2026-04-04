import { ActionResult } from "@/types/actions";
import {
  AppError,
  ValidationError,
} from "./app-errors";

export function errorToActionResult<
  TFields extends Record<string, string>,
  TData = undefined
>(
  error: unknown
): ActionResult<TFields, TData> {
  if (error instanceof ValidationError) {
    return {
      success: false,
      message: error.message,
      fieldErrors: error.fieldErrors as Partial<TFields> | undefined,
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