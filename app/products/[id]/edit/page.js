"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../../lib/api';

export default function EditProduct({ params }) {
  const [name, setName] = useState('');
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await api.get(`/products/${id}`);
          setName(response.data.name);
        } catch (error) {
          console.error('Failed to fetch product:', error);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/products/${id}`, { product: { name } });
      router.push('/products');
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  return (
    <form onSubmit={updateProduct}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Update Product</button>
    </form>
  );
}
