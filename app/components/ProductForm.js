"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function ProductForm({ formTitle, product, onSubmit }) {
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || '');
  const [description, setDescription] = useState(product?.description || '');
  const [approximate_dimensions, setDimensions] = useState(product?.approximate_dimensions || '');
  const [dimensionsError, setDimensionsError] = useState(false);
  const router = useRouter();

  // Rule for format cm x cm x cm | dimensions
  const dimensionRegex = /^\d+\s*cm\s*x\s*\d+\s*cm\s*x\s*\d+\s*cm$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!dimensionRegex.test(approximate_dimensions)) {
      setDimensionsError(true);
      return;
    }

    setDimensionsError(false);
    
    onSubmit({
      name,
      price,
      description,
      approximate_dimensions,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {formTitle}
      </Typography>
      <TextField
        fullWidth
        label="Product Name"
        margin="normal"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Price"
        margin="normal"
        required
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        fullWidth
        label="Description"
        margin="normal"
        required
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        fullWidth
        label="Approximate Dimensions"
        margin="normal"
        required
        value={approximate_dimensions}
        onChange={(e) => setDimensions(e.target.value)}
        error={dimensionsError}
        helperText={
          dimensionsError
            ? "Please use the format: 'Height cm x Width cm x Depth cm'"
            : "Format: 'Height cm x Width cm x Depth cm'"
        }
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
      >
        {formTitle.includes('Edit') ? 'Update Product' : 'Create Product'}
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => router.push('/products')}
      >
        Back to Products
      </Button>
    </Box>
  );
}
