export function parseRecipeAmount(input: string): number | null {
  const value = input.trim().replace(",", ".");

  if (!value) return null;

  if (/^\d+(\.\d+)?$/.test(value)) {
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
  }

  if (/^\d+\/\d+$/.test(value)) {
    const [numerator, denominator] = value.split("/").map(Number);

    if (
      numerator === undefined ||
      denominator === undefined ||
      !Number.isFinite(numerator) ||
      !Number.isFinite(denominator) ||
      denominator === 0
    ) {
      return null;
    }

    return numerator / denominator;
  }

  if (/^\d+\s+\d+\/\d+$/.test(value)) {
    const parts = value.split(/\s+/);
    const wholePart = parts[0];
    const fractionPart = parts[1];

    if (wholePart === undefined || fractionPart === undefined) {
      return null;
    }

    const whole = Number(wholePart);
    const fractionParts = fractionPart.split("/");
    const numerator = Number(fractionParts[0]);
    const denominator = Number(fractionParts[1]);

    if (
      fractionParts[0] === undefined ||
      fractionParts[1] === undefined ||
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