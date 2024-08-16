"use client";

import { useState, useEffect } from 'react';
import api from '../../lib/api';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ProductCard from '../components/ProductCard';
import withAuth from '../../lib/withAuth';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>
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
