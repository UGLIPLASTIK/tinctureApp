import { useAddTinctureMutation, useEditTinctureMutation } from '@/store/api';
import type { Tincture, Sector } from '@/types';
import { CloseCircleOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { useForm, type SubmitHandler } from 'react-hook-form';
import UiBtn from '../UiBtn';
import styles from './uiModal.module.scss';
import { useCallback, useEffect } from 'react';

type Props = {
  onClose: () => void;
  isOpen: boolean;
  sector: Sector;
  list: Tincture[];
  editing: boolean;
  editItem: Tincture | null;
};

const UiModal = ({
  onClose,
  isOpen,
  sector,
  list,
  editItem,
  editing,
}: Props) => {
  const [addTincture] = useAddTinctureMutation();
  const [editTincture] = useEditTinctureMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setFocus,
  } = useForm<Omit<Tincture, 'id'>>({
    defaultValues: {
      actual_quantity: 0,
      recommended_quantity: 0,
    },
  });

  const memoizedResetForm = useCallback(() => {
    if (editing && editItem) {
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
  }, [editItem, editing, reset, setFocus]);

  useEffect(() => {
    if (isOpen) {
      memoizedResetForm();
    }
  }, [isOpen, editing, editItem, reset, setFocus, memoizedResetForm]);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  const onSubmit: SubmitHandler<Omit<Tincture, 'id'>> = (body) => {
    body = { ...body, name: capitalize(body.name), sector };
    const includes = list.find((tin) => tin.name == body.name);
    if (includes && !editing) {
      alert('Такое уже есть');
      return;
    } else {
      if (editItem && editing) {
        editTincture({ ...body, id: editItem.id });
      } else addTincture(body);

      reset();
      onClose();
      setTimeout(() => {
        setFocus('name');
      }, 0);
    }
  };

  return (
    <div
      className={classNames(
        styles.overlay,
        'inset-0',
        'bg-slate-900/60',
        'backdrop-blur'
      )}
      hidden={!isOpen}
    >
      <form
        className={classNames(styles.form)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CloseCircleOutlined
          onClick={() => onClose()}
          className={styles.closeBtn}
        />
        <label>
          <span>Название</span>
          <input
            autoComplete="name"
            {...register('name', {
              required: true,
              maxLength: 40,
            })}
          />
          {errors.name && <p>Название обязательно</p>}
        </label>

        <label>
          <span>Текущее колличество</span>
          <input {...register('actual_quantity', { required: false })} />
        </label>

        <label>
          <span>Рекомендуемое колличество</span>
          <input {...register('recommended_quantity', { required: false })} />
        </label>

        <UiBtn text={!editing ? 'Добавить' : 'Сохранить'} />
      </form>
    </div>
  );
};

export default UiModal;
