"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Container from '@mui/material/Container';
import ProductForm from '../../../components/ProductForm';
import SuccessMessage from '../../../components/SuccessMessage';
import ErrorMessage from '../../../components/ErrorMessage';
import api from '../../../../lib/api';
import withAuth from '../../../../lib/withAuth';

function EditProduct() {
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          setErrorMessage('Session expired. Please log in again.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          console.error('Failed to fetch product:', error);
          setErrorMessage('Failed to load product. Please try again later.');
        }
      }
    };

    fetchProduct();
  }, [id, router]);

  const updateProduct = async (productData) => {
    try {
      await api.put(`/products/${id}`, { product: productData });
      setSuccessMessage('Product updated successfully.');
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
        console.error('Failed to update product:', error);
        setErrorMessage('Failed to update product. Please try again.');
      }
    }
  };

  if (!product && !errorMessage) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />
      {product && (
        <ProductForm 
          formTitle="Edit Product" 
          product={product} 
          onSubmit={updateProduct} 
        />
      )}
    </Container>
  );
}

export default withAuth(EditProduct);
