import styles from './uiBtn.module.scss';
import classNames from 'classnames';
type Props = {
  text?: string;
  theme?: 'light' | 'dark';
  action?: () => void;
  styleClass?: string[];
};

const UiBtn = ({ text, action, theme = 'dark', styleClass = [] }: Props) => {
  return (
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
