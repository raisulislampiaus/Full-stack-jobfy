// src/components/JobDescriptionGenerator.js
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, CircularProgress, TextField, Typography, Paper, Container } from '@mui/material';

const JobDescriptionGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setError('');
    setDescription('');

    try {
      const response = await axios.post('http://localhost:5000/api/jobs/generate-description', { prompt });
      setDescription(response.data.description);
    } catch (error) {
      console.error('Error generating description:', error);
      setError('Failed to generate job description.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ p: 3, mt: 4, display: 'flex', flexDirection: 'column', height: '90vh' }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 500, color: '#333' }}>
        Job Description Generator
      </Typography>

      {/* Chat Interface */}
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        borderRadius: 2, 
        p: 2, 
        bgcolor: '#f9f9fb', 
        mb: 2 
      }}>
        {/* User Prompt Message */}
        {prompt && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: '#007bff',
              color: '#ffffff',
              borderRadius: 2,
              alignSelf: 'flex-end',
              maxWidth: '80%',
              mb: 2,
            }}
          >
            <Typography variant="body1">{prompt}</Typography>
          </Paper>
        )}

        {/* AI Response Message */}
        {description && (
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: '#f1f1f1',
              color: '#333',
              borderRadius: 2,
              alignSelf: 'flex-start',
              maxWidth: '80%',
              mb: 2,
            }}
          >
            <Typography variant="body1">{description}</Typography>
          </Paper>
        )}

        {/* Loading Indicator */}
        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <CircularProgress size={20} />
          </Box>
        )}
      </Box>

      {/* Error Message */}
      {error && (
        <Typography color="error" align="center" sx={{ mb: 1, fontWeight: 'bold' }}>
          {error}
        </Typography>
      )}

      {/* Fixed Input Box */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1, borderRadius: 2, bgcolor: '#ffffff', boxShadow: 1, position: 'sticky', bottom: 0 }}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your job description prompt..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          multiline
          rows={1}
          sx={{
            bgcolor: '#f0f0f0',
            borderRadius: 2,
            '& fieldset': { border: 'none' }, // Removes border
            p: 1,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerate}
          disabled={loading}
          sx={{ borderRadius: 2, px: 3, fontWeight: 'bold' }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Send'}
        </Button>
      </Box>
    </Container>
  );
};

export default JobDescriptionGenerator;
