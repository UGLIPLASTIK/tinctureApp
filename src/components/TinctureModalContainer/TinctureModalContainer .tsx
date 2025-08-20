import { useAddTinctureMutation, useEditTinctureMutation } from '@/store/api';
import UiForm from '@/UI/UiForm';
import UiModal from '@/UI/UiModal';

import { selectListBySector } from '@/store/slices/tincturesSlice/tincturesSelectors';
import { useSelector } from 'react-redux';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const TinctureModalContainer = ({ isOpen, onClose }: Props) => {
  const [addTincture] = useAddTinctureMutation();
  const [editTincture] = useEditTinctureMutation();
  const currentList = useSelector(selectListBySector);

  return (
    <UiModal isOpen={isOpen} onClose={onClose}>
      <UiForm
        closeModal={onClose}
        addTincture={addTincture}
        editTincture={editTincture}
        list={currentList}
        isOpen={isOpen}
      />
    </UiModal>
  );
};

export default TinctureModalContainer;
