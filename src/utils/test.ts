import { calculateProgress } from './tincture.utils';

describe('calculateProgress', () => {
  test('Вычисление прогресса с рекомендованным колличеством 0', () => {
    expect(
      calculateProgress({ actual_quantity: 10, recommended_quantity: 0 })
    ).toBe(0);
  });
  test('Вычисление прогресса с текущим колличеством больше рекомендованного', () => {
    expect(
      calculateProgress({ actual_quantity: 10, recommended_quantity: 5 })
    ).toBe(100);
  });
  test('Вычисление прогресса с текущим колличеством 0', () => {
    expect(
      calculateProgress({ actual_quantity: 0, recommended_quantity: 10 })
    ).toBe(0);
  });
  test('Вычисление прогресса с валидными даннымими', () => {
    expect(
      calculateProgress({ actual_quantity: 7, recommended_quantity: 10 })
    ).toBe(70);
  });
});
