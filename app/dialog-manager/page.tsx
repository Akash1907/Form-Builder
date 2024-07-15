"use client"
import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import ResponseModal from '../Components/Modal/Modal';
const Home = () => {

    return (
        <div>
            <ResponseModal>

                <h1>Some Title HERE</h1>
                <Box>

                <Button sx={{m:1}}component={Link} to="/dialog-manager/dialoguemanager2" variant="contained" color="primary">
                    Dialogue Manager
                </Button>
                <Button sx={{m:1}}component={Link} to="/dialog-manager/workflow" variant="contained" color="primary">
                    Workflow
                </Button>
                </Box>
 
            </ResponseModal>
        </div>
    )
}

export default Home
