"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Container from '@mui/material/Container';
import ProductForm from '../../../components/ProductForm';
import api from '../../../../lib/api';
import withAuth from '../../../../lib/withAuth';

function EditProduct() {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async (productData) => {
    try {
      await api.put(`/products/${id}`, { product: productData });
      router.push('/products');
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <ProductForm 
        formTitle="Edit Product" 
        product={product} 
        onSubmit={updateProduct} 
      />
    </Container>
  );
}

export default withAuth(EditProduct);
