"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../lib/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import ProductCard from '../components/ProductCard';
import withAuth from '../../lib/withAuth';

function Products() {
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          setErrorMessage('Session expired. Please log in again.');
          setTimeout(() => {
            router.push('/login');
          }, 2000);
        } else {
          console.error('Failed to fetch products:', error);
          setErrorMessage('Failed to load products. Please try again later.');
        }
      }
    };

    fetchProducts();
  }, [router]);

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      setSuccessMessage('Product deleted successfully.');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        setErrorMessage('Session expired. Please log in again.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        console.error('Failed to delete product:', error);
        setErrorMessage('Failed to delete product. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>

      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />

      <Button
        variant="contained"
        color="primary"
        href="/products/new"
        sx={{ marginBottom: 2 }}
      >
        Add New Product
      </Button>
      <Grid container spacing={4}>
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onDelete={deleteProduct} 
          />
        ))}
      </Grid>
    </Container>
  );
}

export default withAuth(Products);
