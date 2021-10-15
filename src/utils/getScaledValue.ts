export function getScaledValue(
  value: number,
  sourceRangeMin: number,
  sourceRangeMax: number,
  targetRangeMin: number,
  targetRangeMax: number
): number {
  const targetRange = targetRangeMax - targetRangeMin;
  const sourceRange = sourceRangeMax - sourceRangeMin;
  return (
    ((value - sourceRangeMin) * targetRange) / sourceRange + targetRangeMin
  );
}
