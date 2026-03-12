import type { Unit } from "@/types/unit";

export default function UnitDisplay({
  amount,
  unit,
}: {
  amount?: number;
  unit?: Unit;
}) {
  if (!unit) return <>No unit passed</>;

  if (amount === undefined || amount === null) {
    return <>{unit.abbreviation ?? unit.name}</>;
  }

  const displayed =
    Number(amount) > 1
      ? unit.abbreviation ?? unit.plural ??  unit.name
      : unit.abbreviation ?? unit.name;

  return <>{displayed}</>;
}