"use client";

import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import ProductForm from '../../components/ProductForm';
import api from '../../../lib/api';
import withAuth from '../../../lib/withAuth';

function NewProduct() {
  const router = useRouter();

  const createProduct = async (productData) => {
    try {
      await api.post('/products', { product: productData });
      router.push('/products');
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <ProductForm 
        formTitle="Create New Product" 
        onSubmit={createProduct} 
      />
    </Container>
  );
}

export default withAuth(NewProduct);
