export function formatAmount(amount: number) {
    const fractions: Record<number, string> = {
        0.25: "¼",
        0.33: "⅓",
        0.5: "½",
        0.66: "⅔",
        0.75: "¾",
    };

    const whole = Math.floor(amount);
    const decimal = Number((amount - whole).toFixed(2));

    const fraction = fractions[decimal];

    if (!fraction) return amount.toString();

    if (whole === 0) return fraction;

    return `${whole}${fraction}`;
}