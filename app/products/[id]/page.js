"use client";

import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import withAuth from '../../../lib/withAuth';

function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const { id } = params;

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

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      {}
    </div>
  );
}

export default withAuth(ProductDetails);
