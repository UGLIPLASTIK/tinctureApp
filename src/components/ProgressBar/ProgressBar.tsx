import { calculateProgress } from '@/utils/tincture.utils';
import { ConfigProvider, Progress } from 'antd';
import styles from './progressBar.module.scss';
import type { Tincture } from '@/types';

type Props = {
  quantity: Pick<Tincture, 'actual_quantity' | 'recommended_quantity'>;
  quantityChanger: (action: '+' | '-') => void;
};

const ProgressBar = ({ quantity, quantityChanger }: Props) => {
  const { actual_quantity, recommended_quantity } = quantity;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorText: '#ffffffca',
        },
      }}
    >
      <div className={styles.progressGroup}>
        <Progress
          format={() => `${actual_quantity}л / ${recommended_quantity}л`}
          percent={calculateProgress({ actual_quantity, recommended_quantity })}
          size="small"
          strokeColor={{
            from: '#f84144',
            to: '#3ad848',
          }}
          trailColor="#292b4877"
        />
        <div className={styles.progressControll}>
          <button onClick={() => quantityChanger('-')}>-</button>
          <button onClick={() => quantityChanger('+')}>+</button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ProgressBar;
