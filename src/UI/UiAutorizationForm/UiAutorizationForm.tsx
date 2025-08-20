import UiBtn from '../UiBtn';
import styles from './UiAutorizationForm.module.scss';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { isIncorrect } from '@/store/slices/autorizationSlice/autorizationSelectors';
import { useSelector } from 'react-redux';

type Props = {
  onSubmitFn: (key: string) => void;
};

type FormValues = {
  accessKey: string;
};

const UiAutorizationForm = ({ onSubmitFn }: Props) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const incorrect = useSelector(isIncorrect);

  const onSubmit: SubmitHandler<FormValues> = ({ accessKey }) => {
    onSubmitFn(accessKey.toString());
  };

  return (
    <form
      className={styles.UiAutorizationForm}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>
        <label>
          Введите ключ доступа
          <input
            type="number"
            {...register('accessKey', {
              required: true,
            })}
          />
          {incorrect && <p className={styles.errorMessage}>Неверный ключ</p>}
        </label>
      </label>

      <UiBtn text={'Подтвердить'} />
    </form>
  );
};

export default UiAutorizationForm;
