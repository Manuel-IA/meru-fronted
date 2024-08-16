"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import SuccessMessage from '../../components/SuccessMessage';
import ErrorMessage from '../../components/ErrorMessage';
import ProductForm from '../../components/ProductForm';
import api from '../../../lib/api';
import withAuth from '../../../lib/withAuth';

function NewProduct() {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const createProduct = async (productData) => {
    try {
      await api.post('/products', { product: productData });
      setSuccessMessage('Product created successfully!');
      setTimeout(() => {
        router.push('/products');
      }, 500);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        setErrorMessage('Session expired. Please log in again.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        console.error('Failed to create product:', error);
        setErrorMessage('Failed to create product. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />
      <ProductForm 
        formTitle="Create New Product" 
        onSubmit={createProduct} 
      />
    </Container>
  );
}

export default withAuth(NewProduct);
