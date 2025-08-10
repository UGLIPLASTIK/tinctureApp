import style from './uiBtn.module.scss';
import classNames from 'classnames';
type Props = {
  text: string;
  theme?: 'light' | 'dark';
  action?: () => void;
};

const UiBtn = ({ text, action, theme = 'dark' }: Props) => {
  return (
    <button
      className={classNames([
        style.uiBtn,
        theme == 'light' ? style.uiBtn__light : null,
      ])}
      onClick={() => (action ? action() : null)}
    >
      {text}
    </button>
  );
};

export default UiBtn;
