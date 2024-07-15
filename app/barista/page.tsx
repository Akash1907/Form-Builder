"use client"
import { useState } from 'react'
import { Button, Box, Typography, Container, CircularProgress } from '@mui/material';
import { generateReport } from '../service/barista/baristaService';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';

const UploadPage = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [report, setReport] = useState<{ [key: string]: number } | null>(null);
  const [processedVideo, setProcessedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleGenerateReport = async () => {
    if (videoFile) {
      const formData = new FormData();
      formData.append('file', videoFile);
      setLoading(true);
      try {
        const response = await generateReport(formData);
        setReport(response); 
      } catch (error:any) {
        toast.error("Error generating report: " + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDownloadReport = () => {
    if (report) {
      const wsData = [['Item', 'Count']];
      Object.keys(report).forEach((key:any) => {
        wsData.push([key, report[key]]);
      });
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, 'Results');
      XLSX.writeFile(wb, 'file.xlsx');
    }
  };

  const handleDownloadProcessedVideo = () => {
    if (processedVideo) {
      console.log('Downloading processed video...'); // Implement logic to download processed video
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Process Video
      </Typography>
      <Box sx={{ marginBottom: '20px' }}>
        <Button
          variant="contained"
          component="label"
        >
          Upload Video
          <input
            type="file"
            accept="video/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
      </Box>
      {videoFile && (
        <Box sx={{ marginBottom: '20px' }}>
          <Button
            variant="contained"
            onClick={handleGenerateReport}
            disabled={!videoFile || loading}
          >
            Generate Report
          </Button>
        </Box>
      )}
      {loading && (
        <Box sx={{ marginBottom: '20px' }}>
          <CircularProgress />
        </Box>
      )}
      {report && (
        <Box sx={{ marginBottom: '20px' }}>
          <Button
            variant="contained"
            onClick={handleDownloadReport}
            disabled={!report}
          >
            Download Report
          </Button>
        </Box>
      )}
      {processedVideo && (
        <Box sx={{ marginBottom: '20px' }}>
          <Button
            variant="contained"
            onClick={handleDownloadProcessedVideo}
            disabled={!processedVideo}
          >
            Download Processed Video
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default UploadPage;
