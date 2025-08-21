import styles from './uiBtn.module.scss';
import classNames from 'classnames';
type Props = {
  text?: string;
  theme?: 'light' | 'dark';
  action?: () => void;
  styleClass?: string[];
  hidden?: boolean;
};

const UiBtn = ({
  text,
  action,
  theme = 'dark',
  styleClass = [],
  hidden = false,
}: Props) => {
  return hidden ? null : (
    <button
      className={classNames([
        styles.uiBtn,
        ...styleClass.map((style) => styles[style]),
        theme == 'light' ? styles.uiBtn__light : null,
      ])}
      onClick={() => (action ? action() : null)}
    >
      {text}
    </button>
  );
};

export default UiBtn;
