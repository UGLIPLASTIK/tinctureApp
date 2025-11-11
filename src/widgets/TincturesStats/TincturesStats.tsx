import type { InputNumberProps } from 'antd';
import { Slider } from 'antd';
import { useState } from 'react';
import { type Tincture } from '../../types';
import styles from './TincturesStats.module.scss';

type Props = {
  items: Tincture[];
};

const TincturesStats = ({ items }: Props) => {
  const [hidden, setHidden] = useState(true);
  const [percent, setPercent] = useState(50);

  const onChange: InputNumberProps['onChange'] = (newValue) => {
    setPercent(newValue as number);
  };

  const allTinctsCount = items.length;
  const tinctsInStock = items.filter((item) => item.actual_quantity > 0).length;
  const totalLiters = items.reduce((acc, el) => {
    acc += el.recommended_quantity;
    return acc;
  }, 0);
  const litersInStock = items.reduce((acc, el) => {
    acc += el.actual_quantity;
    return acc;
  }, 0);

  return (
    <div className={styles.stats}>
      <div>{`${tinctsInStock} / ${allTinctsCount}`}</div>
      <div>{`${litersInStock} л. / ${totalLiters} л.`}</div>
      <div className={styles.value}>
        <div>Нужно сделать еще: {totalLiters - litersInStock} л.</div>
      </div>

      <div className={styles.needList} hidden={hidden}>
        <div className={styles.showFrom}>Показать меньше: {percent}%</div>
        <Slider
          min={1}
          max={100}
          onChange={onChange}
          value={typeof percent === 'number' ? percent : 0}
        />
        <ul className={styles.details} hidden={hidden}>
          {items
            .filter((item) => {
              const itemPercent = Math.trunc(
                item.actual_quantity / (item.recommended_quantity / 100)
              );
              return itemPercent < percent;
            })
            .map((item) => (
              <li key={item.id}>{`${item.name} ${
                item.recommended_quantity - item.actual_quantity
              }`}</li>
            ))}
        </ul>
      </div>
      <button
        style={{
          transform: hidden
            ? 'rotate(0deg) translateY(-50%)'
            : 'rotate(180deg) translateY(50%)',
        }}
        onClick={() => setHidden((prew) => !prew)}
      ></button>
    </div>
  );
};

export default TincturesStats;
