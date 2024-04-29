import React from 'react';
import { Grid } from '@mui/material';
import ProductCard from './ProductCard';

const products = [
  // Sample product data
  {
    id: 1,
    title: 'Sample Product 1',
    description: 'This is a sample product description.',
    imageUrl: 'https://via.placeholder.com/150',
  },
  // Add more products here...
];

const ProductList = () => {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductList;
