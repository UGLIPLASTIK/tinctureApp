import { calculateProgress } from '@/utils/tincture.utils';
import { ConfigProvider, Progress } from 'antd';
import styles from './progressBar.module.scss';
import type { Tincture } from '@/types';
import classNames from 'classnames';

type Props = {
  quantity: Pick<Tincture, 'actual_quantity' | 'recommended_quantity'>;
  quantityChanger: (action: '+' | '-') => void;
  visible: boolean;
};

const ProgressBar = ({ quantity, quantityChanger, visible }: Props) => {
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
        <div
          className={classNames([
            styles.progressControll,
            !visible ? styles['progressControll__hidden'] : '',
          ])}
        >
          <button
            className={classNames([styles.quantBtn, styles['quantBtn__plus']])}
            onClick={() => quantityChanger('+')}
          ></button>
          <button
            className={classNames([styles.quantBtn, styles['quantBtn__minus']])}
            onClick={() => quantityChanger('-')}
          ></button>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default ProgressBar;
