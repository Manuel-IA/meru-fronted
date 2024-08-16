"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../../lib/api';
import withAuth from '../../../../lib/withAuth';

function EditProduct({ params }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [approximate_dimensions, setDimensions] = useState('');
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const response = await api.get(`/products/${id}`);
          setName(response.data.name);
          setPrice(response.data.price);
          setDescription(response.data.description);
          setDimensions(response.data.approximate_dimensions);
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
      await api.put(`/products/${id}`, { 
        product: {
          name,
          price,
          description,
          approximate_dimensions,
        } });
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
        value={approximate_dimensions}
        onChange={(e) => setDimensions(e.target.value)}
      />
      <button type="submit">Update Product</button>
    </form>
  );
}


export default withAuth(EditProduct);
