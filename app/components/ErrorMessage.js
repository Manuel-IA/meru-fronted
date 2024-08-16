"use client";

import Alert from '@mui/material/Alert';

export default function ErrorMessage({ message }) {
  return (
    message && (
      <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
        {message}
      </Alert>
    )
  );
}
