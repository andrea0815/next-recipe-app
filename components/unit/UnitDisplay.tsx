import type { Unit } from "@/types/unit";

export default function UnitDisplay({
  amount,
  unit,
}: {
  amount?: number;
  unit?: Unit;
}) {
  if (!unit) return <>No unit passed</>;

  // 1. Abbreviation hat immer Vorrang
  if (unit.abbreviation) {
    return <>{unit.abbreviation}</>;
  }

  // 2. Kein Amount → fallback auf name
  if (amount === undefined || amount === null) {
    return <>{unit.name}</>;
  }

  // 3. Plural-Logik
  const isPlural = Number(amount) > 1;

  if (isPlural && unit.plural) {
    return <>{unit.plural}</>;
  }

  // 4. Fallback
  return <>{unit.name}</>;
}