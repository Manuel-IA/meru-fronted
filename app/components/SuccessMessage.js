"use client";

import Alert from '@mui/material/Alert';

export default function SuccessMessage({ message }) {
  return (
    message && (
      <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
        {message}
      </Alert>
    )
  );
}
