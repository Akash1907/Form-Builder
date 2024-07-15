"use client";

import React, { useEffect, useState } from "react";
import { Box, Accordion, AccordionDetails, Button } from "@mui/material";
import * as XLSX from 'xlsx';
import { JsonForms, withJsonFormsControlProps } from "@jsonforms/react";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";


const initialSchema = {
  type: "object",
  properties: {
    question1: {
      type: "string",
      title: " What is the recommended daily water intake for adults?",
      enum: ["2 cups", "4 cups", "8 cups", "12 cups"],
    },
    question2: {
      type: "string",
      title:
        "Which nutrient is responsible for building and repairing body tissues?",
      enum: ["Carbohydrates", "Proteins", "Fats", "Vitamins"],
    },
    question3: {
      type: "string",
      title: "Which of the following is a good source of vitamin C?",
      enum: ["Oranges", "Eggs", "Beef", "Whole grains"],
    },
    question4: {
      type: "string",
      title: "What is the average recommended sleep duration for adults?",
      enum: ["4 hours", "6 hours", "8 hours", "10 hours"],
    },
    question5: {
      type: "string",
      title: "What is the main function of carbohydrates in the body?",
      enum: [
        "Provide energy",
        "Build muscles",
        "Regulate body temperature",
        "Enhance brain function",
      ],
    },
    question6: {
      type: "string",
      title: "Which of the following is a high-fiber food?",
      enum: ["White bread", "White rice", "Oatmeal", "Soda"],
    },
    question7: {
      type: "string",
      title: "What is the recommended duration for brushing teeth?",
      enum: ["10 seconds", "30 seconds", "2 minutes", "5 minutes"],
    },
    question8: {
      type: "string",
      title: "Which exercise is beneficial for cardiovascular health?",
      enum: ["Running", "Weightlifting", "Yoga", "Stretching"],
    },
  },
};

const initialUiSchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Control",
      scope: "#/properties/question1",
      options: {
        format: "radio",
      },
    },
    {
      type: "Control",
      scope: "#/properties/question2",
      options: {
        format: "radio",
      },
    },
    {
      type: "Control",
      scope: "#/properties/question3",
      options: {
        format: "radio",
      },
    },
    {
      type: "Control",
      scope: "#/properties/question4",
      options: {
        format: "radio",
      },
    },
    {
      type: "Control",
      scope: "#/properties/question5",
      options: {
        format: "radio",
      },
    },
    {
      type: "Control",
      scope: "#/properties/question6",
      options: {
        format: "radio",
      },
    },
    {
      type: "Control",
      scope: "#/properties/question7",
      options: {
        format: "radio",
      },
    },
    {
      type: "Control",
      scope: "#/properties/question8",
      options: {
        format: "radio",
      },
    },
  ],
};
const questions = {
  question1: "8 cups",
  question2: "Proteins",
  question3: "Oranges",
  question4: "8 hours",
  question5: "Provide energy",
  question6: "Oatmeal",
  question7: "2 minutes",
  question8: "Running",
};

interface Result {
  correctCount: number;
  incorrectCount: number;
  details: { [key: string]: boolean };
}

const MyFormComponent = () => {
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState<Result>({ correctCount: 0, incorrectCount: 0, details: {} });

  useEffect(() => {
    const storedResult = localStorage.getItem('result');
    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }
  }, []);
  const handleFormChange = ({ data }: { data: FormData }) => {
    setFormData(data);
  };

  const checkAnswers = (questions: any, answers: any) => {
    const result: any = {
      correctCount: 0,
      incorrectCount: 0,
      details: {},
    };

    for (const key in questions) {
      if (questions.hasOwnProperty(key) && answers.hasOwnProperty(key)) {
        const isCorrect = questions[key] === answers[key];
        result.details[key] = isCorrect;
        if (isCorrect) {
          result.correctCount++;
        } else {
          result.incorrectCount++;
        }
      } else {
        result.details[key] = false;
        result.incorrectCount++;
      }
    }

    return result;
  };
  
  const downloadExcel = () => {
    const answerResult = checkAnswers(questions, formData);
      // Generate and download Excel file
      const wb = XLSX.utils.book_new();
      const wsData = [
        ['Total Correct', answerResult.correctCount],
        ['Total Incorrect', answerResult.incorrectCount]
      ];
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, 'Results');
      XLSX.writeFile(wb, 'quiz_results.xlsx');
    
  };
  const handleSubmit = () => {
    const answerResult = checkAnswers(questions, formData);
    setResult(answerResult);
    
  };

  return (
    <div className="customradio">
      <Accordion>
        <AccordionDetails>
          <Box mb={2}>
            <JsonForms
              schema={initialSchema}
              uischema={initialUiSchema}
              data={formData}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={handleFormChange}
            />
          </Box>
          <Button variant="contained" onClick={handleSubmit}>Result show</Button> <Button variant="contained" onClick={downloadExcel}>Download Excel</Button>
          <div className="marto">
            <span className="CorrectCount">CorrectCount: {result.correctCount}</span>
            <span className="IncorrectCount">IncorrectCount: {result.incorrectCount}</span>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MyFormComponent;
