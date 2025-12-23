import {
  getAutorizationData,
  isIncorrect,
} from '@/store/slices/autorizationSlice/autorizationSelectors';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import UiBtn from '../UiBtn';
import UiModal from '../UiModal';
import styles from './UiAutorizationForm.module.scss';

type Props = {
  onSubmitFn: (key: string) => void;
};

type FormValues = {
  accessKey: string;
};

const UiAutorizationForm = ({ onSubmitFn }: Props) => {
  const { register, handleSubmit } = useForm<FormValues>();
  const incorrect = useSelector(isIncorrect);
  const autorizationData = useSelector(getAutorizationData);
  const { currentRole } = autorizationData;

  const onSubmit: SubmitHandler<FormValues> = ({ accessKey }) => {
    onSubmitFn(accessKey.toString());
  };

  return (
    <UiModal onClose={() => {}} isOpen={!currentRole}>
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
    </UiModal>
  );
};

export default UiAutorizationForm;
