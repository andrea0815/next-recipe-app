export function parseRecipeAmount(input: string): number | null {
  const value = input.trim().replace(",", ".");

  if (!value) return null;

  if (/^\d+(\.\d+)?$/.test(value)) {
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
  }

  if (/^\d+\/\d+$/.test(value)) {
    const [numerator, denominator] = value.split("/").map(Number);
    if (!Number.isFinite(numerator) || !Number.isFinite(denominator) || denominator === 0) {
      return null;
    }
    return numerator / denominator;
  }

  if (/^\d+\s+\d+\/\d+$/.test(value)) {
    const [wholePart, fractionPart] = value.split(/\s+/);
    const whole = Number(wholePart);
    const [numerator, denominator] = fractionPart.split("/").map(Number);

    if (
      !Number.isFinite(whole) ||
      !Number.isFinite(numerator) ||
      !Number.isFinite(denominator) ||
      denominator === 0
    ) {
      return null;
    }

    return whole + numerator / denominator;
  }

  return null;
}