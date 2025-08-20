import type { Tincture } from '@/types';

export function calculateProgress({
  actual_quantity,
  recommended_quantity,
}: Pick<Tincture, 'actual_quantity' | 'recommended_quantity'>) {
  if (recommended_quantity === 0) return 0;
  const progress = (actual_quantity / recommended_quantity) * 100;
  return Math.min(progress, 100);
}

export function sortTinctures(
  items: Tincture[],
  sorting: boolean,
  sortOnDefault: boolean
) {
  if (sortOnDefault)
    return [...items].sort((a, b) => a.name.localeCompare(b.name, 'ru'));
  const sortedItems = [...items].sort(
    (
      { actual_quantity: aActual, recommended_quantity: aRecommended },
      { actual_quantity: bActual, recommended_quantity: bRecommended }
    ) => {
      const progressA = calculateProgress({
        actual_quantity: aActual,
        recommended_quantity: aRecommended,
      });
      const progressB = calculateProgress({
        actual_quantity: bActual,
        recommended_quantity: bRecommended,
      });
      return sorting ? progressA - progressB : progressB - progressA;
    }
  );
  return sortedItems;
}
