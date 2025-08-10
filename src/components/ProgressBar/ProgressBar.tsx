import { calculateProgress } from '@/utils/tincture.utils';
import { ConfigProvider, Progress } from 'antd';
import styles from './progressBar.module.scss';
import type { Tincture } from '@/types';

type Props = Pick<Tincture, 'actual_quantity' | 'recommended_quantity'>;

const ProgressBar = ({ actual_quantity, recommended_quantity }: Props) => {
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
          <button onClick={() => null}>-</button>
          <button onClick={() => null}>+</button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ProgressBar;
