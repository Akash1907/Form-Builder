'use client'

import {useState} from 'react';
import{
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  ExpandMoreIcon,
  Button,
  Box,
  Card
} from '../../Components/muiIcons/muiIcons';


export default function PostSchedule() {

    // const [isClicked, setIsClicked] = useState(false);
    const [firstClick, setFirstClick] = useState(false);
    const [secondClick, setSecondCLick] = useState(false);
    const [thirdClick, setThridClick] = useState(false); 

    const handleFirstClick = () => {
      setFirstClick(true);
      setSecondCLick(false);
      setThridClick(false);
    };
    const handleSecondClick = () =>{
        setSecondCLick(true);
        setFirstClick(false);
        setThridClick(false);

    }
    const handleThridClick = () =>{
        setThridClick(true);
        setSecondCLick(false);
        setFirstClick(false);
    }

  return (
    <Box sx = {{marginTop: 3}}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Schedule Your Post
        </AccordionSummary>
        <AccordionDetails>
          <Card onClick={handleFirstClick} sx = {{padding: 1, borderRadius: "5px", cursor: "pointer", backgroundColor: firstClick ? 'rgb(17, 80, 170)' : '', color: firstClick ? 'white' : '', fontSize: 15 }}>
            Immediately
          </Card>
          <Card onClick={handleSecondClick} sx = {{padding: 1, borderRadius: "5px", marginTop: 2, fontSize: 15, backgroundColor: secondClick ? 'rgb(17, 80, 170)' : '', color: secondClick ? 'white' : '', cursor: "pointer"}}>
            Auto Schedule with Assisto Queue
          </Card>
          <Card onClick={handleThridClick} sx = {{padding: 1, borderRadius: "5px", marginTop: 2, fontSize: 15,backgroundColor: thirdClick ? 'rgb(17, 80, 170)' : '', color: thirdClick ? 'white' : '', cursor: "pointer"}}> 
            Specific Day and Time
          </Card>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
