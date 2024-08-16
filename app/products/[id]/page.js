"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SuccessMessage from '../../components/SuccessMessage';
import ErrorMessage from '../../components/ErrorMessage';
import api from '../../../lib/api';
import withAuth from '../../../lib/withAuth';

function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { id } = params;
  const router = useRouter();

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

  const deleteProduct = async () => {
    try {
      await api.delete(`/products/${id}`);
      setSuccessMessage('Product deleted successfully.');
      setTimeout(() => {
        router.push('/products');
      }, 2000);
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

  if (!product && !errorMessage) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <ErrorMessage message={errorMessage} />
      <SuccessMessage message={successMessage} />
      {product && (
        <Card>
          <CardContent>
            <Typography variant="h4" component="div" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {product.price} USD
            </Typography>
            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dimensions: {product.approximate_dimensions}
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => router.push(`/products/${id}/edit`)}
            >
              Edit
            </Button>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={deleteProduct}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      )}
      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          onClick={() => router.push('/products')}
        >
          Back to Products
        </Button>
      </Box>
    </Container>
  );
}

export default withAuth(ProductDetails);
