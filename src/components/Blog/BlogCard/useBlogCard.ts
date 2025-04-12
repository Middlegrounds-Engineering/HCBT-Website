import { useState, useCallback } from 'react';

export const useBlogCard = (onEdit?: () => void) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = useCallback(() => {
    setShowEditModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowEditModal(false);
  }, []);

  const handleUpdate = useCallback(() => {
    if (onEdit) onEdit();
    setShowEditModal(false);
  }, [onEdit]);

  return {
    showEditModal,
    handleEdit,
    handleCloseModal,
    handleUpdate
  };
};