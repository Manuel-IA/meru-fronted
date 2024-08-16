"use client";

import { useState, useEffect } from 'react';
import api from '../../lib/api';
import Link from 'next/link';
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
    <div>
      <h1>Products</h1>
      <Link href="/products/new">
        <button>Add New Product</button>
      </Link>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} |
            {product.price} |
            {product.description} |
            {product.approximate_dimensions}
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
            <Link href={`/products/${product.id}/edit`}>
              <button>Edit</button>
            </Link>
            <Link href={`/products/${product.id}`}>
              <button>Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withAuth(Products);
