import { useEffect } from 'react';
import StyledModal from './StyledModal';
import StyledModalOverlay from './StyledModalOverlay';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import PropTypes from 'prop-types';

function Modal({ toggleModal, dataImg }) {
  const handleClickOverlay = event => {
    if (event.target === event.currentTarget) toggleModal();
  };

  useEffect(() => {
    const handleKeyClosed = event => {
      if (event.code === 'Escape') toggleModal();
    };
    document.addEventListener('keydown', handleKeyClosed);
    return () => document.removeEventListener('keydown', handleKeyClosed);
  }, [toggleModal]);

  return (
    <StyledModalOverlay onClick={handleClickOverlay}>
      <StyledModal>
        <img
          data-src={dataImg.urlLargeImage}
          alt={dataImg.tags}
          className="lazyload blur-up"
        />
      </StyledModal>
    </StyledModalOverlay>
  );
}

export default Modal;

Modal.propTypes = {
  dataImg: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    urlLargeImage: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
