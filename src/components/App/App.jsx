import { useState, useEffect, useLayoutEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { fetchImagesWithSearchValue } from '../../services/PixabayApi';
import Button from '../Button';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Loader from '../Loader';
import Modal from '../Modal';

import { GlobalStyle } from '../GlobalStyle';
import { AppCss } from './App.styled';

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState(null);

  useEffect(() => {
    if (!searchValue) {
      return;
    }
    setIsLoading(true);
    const getImages = async () => {
      try {
        const response = await fetchImagesWithSearchValue(searchValue, page);
        if (response.length <= 0) {
          toast.error('Not result, please input a new search value!');
        }
        const galleryImg = response.map(({ id, webformatURL, largeImageURL }) => ({
                id,
                webformatURL,
                largeImageURL,
              }));
        setImages(prevImg => [...prevImg, ...galleryImg]);
      } catch (error){
        setError(error)
      } finally {
        setIsLoading(false);
      }
    }
    getImages();
  }, [page, searchValue]);

  useLayoutEffect(() => {
    if(page > 1){
      handleScrollToNewImages();
    }
  }, [page])
  
 const handleSubmitForm = searchValue => {
    setSearchValue(searchValue);
    resetPage();
  };
  const handleLoadMore = () => {
    setPage(page + 1)
  };
  
  const resetPage = () => {
    setPage(1);
    setImages([]);
  };
   
  const handleToggleModal = () => {
    setShowModal(!showModal);
  };

  const setLargeImgUrl = largeImageURL => {
    setLargeImageURL(largeImageURL)
    handleToggleModal();
  };

  const handleScrollToNewImages = () => {
    
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }
  return ( 
    <AppCss>
    <GlobalStyle />
    <Searchbar onSubmit={handleSubmitForm} />
    <ToastContainer theme="colored" />
    {error && <h1>{error.message}</h1>}

    {images.length > 0 && (
      <ImageGallery images={images} setLargeImgUrl={setLargeImgUrl} />
    )}
    {isLoading && <Loader />}
    {images.length > 0 && !isLoading && (
      <Button onLoadMore={handleLoadMore} />
    )}

    {showModal && (
      <Modal onClose={handleToggleModal}>
        <img src={largeImageURL} alt="" />
      </Modal>
    )}
  </AppCss>
   );
}
 
export default App;

