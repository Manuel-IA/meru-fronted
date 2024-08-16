"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/api';
import withAuth from '../../../lib/withAuth';

function NewProduct() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [dimensions, setDimensions] = useState('');
  const router = useRouter();

  const createProduct = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', {
        product: {
          name,
          price,
          description,
          approximate_dimensions: dimensions,
        },
      });
      router.push('/products');
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return (
    <form onSubmit={createProduct}>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Approximate Dimensions"
        value={dimensions}
        onChange={(e) => setDimensions(e.target.value)}
      />
      <button type="submit">Create Product</button>
    </form>
  );
}

export default withAuth(NewProduct);
