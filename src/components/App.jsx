import { useState, useEffect } from 'react';

import Container from './Container/Container';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

import fetchImages from '../services/Api';
import {
  errorInfo,
  infoCorrectRequest,
  infoEmptyRequest,
} from 'services/report';

export default function App() {
  const perPage = 12;

  const [data, setData] = useState([]);
  const [searchImagesName, setSearchImagesName] = useState('');
  const [numPage, setNumPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState({
    isShowModal: false,
    dataModalImg: null,
  });
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!searchImagesName || !numPage) return;
    async function fetchImageRequest() {
      try {
        setIsLoading(true);
        const dataImages = await fetchImages(
          searchImagesName,
          numPage,
          perPage
        );
        const allPages = Math.ceil(dataImages.totalHits / perPage);
        setTotalPages(allPages);
        setData(prevState =>
          numPage === 1 ? dataImages.hits : [...prevState, ...dataImages.hits]
        );
        numPage === 1 &&
          dataImages.hits.length &&
          infoCorrectRequest(dataImages.totalHits);
        !dataImages.hits.length && infoEmptyRequest();
      } catch (error) {
        setErrorMessage(error.response.data);
        errorInfo(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchImageRequest();
  }, [searchImagesName, numPage]);

  const handleLoadMore = () => {
    setNumPage(prevState => prevState + 1);
  };

  const handleSubmit = searchValue => {
    setSearchImagesName(searchValue);
    setNumPage(1);
  };

  const toggleModal = dataModal => {
    setModal({
      isShowModal: !modal.isShowModal,
      dataModalImg: dataModal || null,
    });
  };

  return (
    <Container>
      <SearchBar handleSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {errorMessage && <>Ooops... {errorMessage}</>}
      {data.length > 0 && (
        <ImageGallery images={data} toggleModal={toggleModal} />
      )}
      {data.length > 0 && totalPages !== numPage && (
        <Button handleLoadMore={handleLoadMore} />
      )}
      {modal.isShowModal && (
        <Modal dataImg={modal.dataModalImg} toggleModal={toggleModal}></Modal>
      )}
    </Container>
  );
}
