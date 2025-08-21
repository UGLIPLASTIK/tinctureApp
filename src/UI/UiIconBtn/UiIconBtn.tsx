import styles from './uiIconBtn.module.scss';

type Props = {
  action: () => void;
  iconUrl: string;
};

const UiIconBtn = ({ iconUrl, action }: Props) => {
  const url = `url("${iconUrl}")`;

  return (
    <button
      style={{ backgroundImage: url }}
      className={styles.uiIconBtn}
      onClick={() => action()}
    ></button>
  );
};

export default UiIconBtn;
