"use client";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function ProductCard({ product, onDelete }) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {product.name}
          </Typography>
          <Typography color="text.secondary" sx={{ marginBottom: 1.5 }}>
            {product.price} USD
          </Typography>
          <Typography variant="body2">
            {product.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Dimensions: {product.approximate_dimensions}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={() => onDelete(product.id)}>
            Delete
          </Button>
          <Button size="small" href={`/products/${product.id}/edit`}>
            Edit
          </Button>
          <Button size="small" href={`/products/${product.id}`}>
            Details
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
