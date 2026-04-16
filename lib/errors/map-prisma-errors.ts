import { Prisma } from "@/app/generated/prisma";
import { AppError } from "./app-errors";

export function mapPrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        throw new AppError("A record with this value already exists.");
      case "P2003":
        throw new AppError("This item cannot be deleted because it is still in use.");
      case "P2025":
        throw new AppError("The requested record was not found.");
      default:
        throw new AppError("Database request failed.");
    }
  }

  throw error;
}