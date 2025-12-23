import { useAddTinctureMutation, useEditTinctureMutation } from '@/store/api';
import { tinctureModalIsOpen } from '@/store/slices/intefaceSlice/intefaceSelectors';
import { setTinctureModalIsOpen } from '@/store/slices/intefaceSlice/intefaceSlice';
import { clearEditData } from '@/store/slices/operationSlice/operationSlice';
import { selectListBySector } from '@/store/slices/tincturesSlice/tincturesSelectors';
import UiForm from '@/UI/UiForm';
import UiModal from '@/UI/UiModal';
import { useDispatch, useSelector } from 'react-redux';

const TinctureModalContainer = () => {
  const [addTincture] = useAddTinctureMutation();
  const [editTincture] = useEditTinctureMutation();
  const currentList = useSelector(selectListBySector);
  const isOpen = useSelector(tinctureModalIsOpen);
  const dispatch = useDispatch();
  const onClose = () => {
    dispatch(clearEditData());
    dispatch(setTinctureModalIsOpen());
  };

  return (
    <UiModal isOpen={isOpen} onClose={onClose}>
      <UiForm
        addTincture={addTincture}
        editTincture={editTincture}
        list={currentList}
      />
    </UiModal>
  );
};

export default TinctureModalContainer;
