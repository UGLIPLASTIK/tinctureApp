import { ConfigProvider, Spin } from 'antd';
import styles from './loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#e600ff',
          },
        }}
      >
        <Spin size="large" />
      </ConfigProvider>
    </div>
  );
};

export default Loader;
