import { getEditData } from '@/store/slices/operationSlice/operationSelectors';
import { currentSector } from '@/store/slices/tincturesSlice/tincturesSelectors';
import type { Tincture } from '@/types';
import { capitalize } from '@/utils/utils';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import UiBtn from '../UiBtn';
import styles from './uiForm.module.scss';

type Props = {
  addTincture: (item: Omit<Tincture, 'id'>) => void;
  editTincture: (item: Tincture) => void;
  closeModal: () => void;
  list: Tincture[];
  isOpen: boolean;
};

const UiForm = ({
  addTincture,
  editTincture,
  list,
  isOpen,
  closeModal,
}: Props) => {
  const { editing, editItem } = useSelector(getEditData);
  const sector = useSelector(currentSector);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Omit<Tincture, 'id'>>({
    mode: 'onChange',
    defaultValues: {
      actual_quantity: 0,
      recommended_quantity: 0,
    },
  });

  const onSubmit: SubmitHandler<Omit<Tincture, 'id'>> = (body) => {
    if (sector === null) {
      return;
    }
    body = { ...body, name: capitalize(body.name), sector };
    const includes = list.find((tin) => tin.name == body.name);
    if (includes && !editing) {
      alert('Такое уже есть');
      return;
    } else {
      if (editing) {
        editTincture({ ...body, id: editItem.id });
      } else addTincture(body);

      reset();
      closeModal();
      setTimeout(() => {
        setFocus('name');
      }, 0);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (editing) {
        reset({
          name: editItem.name || '',
          actual_quantity: editItem.actual_quantity ?? 0,
          recommended_quantity: editItem.recommended_quantity ?? 0,
        });
      } else {
        reset({
          name: '',
          actual_quantity: 0,
          recommended_quantity: 0,
        });
      }
      setTimeout(() => setFocus(!editing ? 'name' : 'actual_quantity'), 0);
    }
  }, [isOpen, editing, editItem, reset, setFocus]);

  return (
    <form
      className={classNames(styles.UiForm)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>
        <span>Название</span>
        <input
          type="text"
          autoComplete="name"
          {...register('name', {
            required: true,
            maxLength: 40,
            minLength: 1,
          })}
        />
        {errors.name?.type === 'required' && (
          <p className={styles.errorMessage}>Название обязательно</p>
        )}
      </label>

      <label>
        <span>Текущее колличество</span>
        <input
          type="number"
          {...register('actual_quantity', {
            required: false,
          })}
        />
      </label>

      <label>
        <span>Рекомендуемое колличество</span>
        <input
          type="number"
          {...register('recommended_quantity', { required: false })}
        />
      </label>

      <UiBtn text={!editing ? 'Добавить' : 'Сохранить'} />
    </form>
  );
};

export default UiForm;
