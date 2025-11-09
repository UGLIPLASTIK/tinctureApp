// import { tincturesInStock } from '../../store/slices/tincturesSlice/tincturesSelectors';
import { useState } from 'react';
import { type Tincture } from '../../types';
import styles from './TincturesStats.module.scss';
import type { InputNumberProps } from 'antd';
import { InputNumber, Slider } from 'antd';

type Props = {
  items: Tincture[];
};

const TincturesStats = ({ items }: Props) => {
  const [hidden, setHidden] = useState(true);
  const [percent, setPercent] = useState(100);

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
    <div>
      <div>{`${tinctsInStock} / ${allTinctsCount}`}</div>
      <div>{`${litersInStock} л. / ${totalLiters} л.`}</div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <div>Нужно сделать еще: {totalLiters - litersInStock} л.</div>
        <button
          style={{
            transform: hidden ? 'rotate(90deg)' : 'rotate(270deg)',
            cursor: 'pointer',
          }}
          onClick={() => setHidden((prew) => !prew)}
        >
          {'>'}
        </button>
      </div>
      <Slider
        min={1}
        max={100}
        onChange={onChange}
        value={typeof percent === 'number' ? percent : 0}
      />
      <InputNumber
        min={1}
        max={100}
        style={{ margin: '0 16px' }}
        value={percent}
        onChange={onChange}
      />
      <div
        // style={{ textAlign: 'left', margin: '0 auto' }}
        className={styles.details}
        hidden={hidden}
      >
        {items
          .filter((item) => {
            const itemPercent = Math.trunc(
              item.actual_quantity / (item.recommended_quantity / 100)
            );
            // console.log(
            //   `item current pencent: ${
            //     item.actual_quantity / (item.recommended_quantity / 100)
            //   }`
            // );
            return itemPercent <= percent;
          })
          .map((item) => (
            <div key={item.id}>{`${item.name} ${
              item.recommended_quantity - item.actual_quantity
            }`}</div>
          ))}
      </div>
    </div>
  );
};

export default TincturesStats;
