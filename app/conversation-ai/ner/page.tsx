"use client";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import dynamic from "next/dynamic";
import { JsonForms } from "@jsonforms/react";
import {Grid,AccountTreeIcon,DeleteIcon,LoadingButton,useTheme,Switch,makeStyles, FormControlLabel, Box, Button, Typography, PersonSearchIcon, AccordionSummary, Accordion} from '../../Components/muiIcons/muiIcons';

import React, { Fragment, useState } from "react";
const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
import ResponseModal from "../../Components/Modal/Modal";

import clearJsonData from "./clearJsonData.json";
import initialJsonData from "./initialJsonData.json";
import schema from "./schema.json";
import uischema from "./uischema.json";
const http = require("http");

const renderers = [
  ...materialRenderers,
  
];

const App: React.FC = () => {
  // USE STATES
  const theme = useTheme();
  const [displayObjectSize, setDisplayObjectSize] = useState<boolean>(false);
  const [displayDataTypes, setDisplayDataTypes] = useState<boolean>(false);
  const [displayRaw, setDisplayRaw] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiEndpoint, setApiEndpoint] = useState(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const classes = useStyles();
  const [loadingStates, setLoadingStates] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [data, setData] = useState<any>(initialJsonData);

  // FUNCTIONS

  const clearData = () => {
    setData(clearJsonData);
  };
  const toggleDisplayRaw = () => {
    setDisplayRaw(!displayRaw);
    setDisplayDataTypes(false);
    setDisplayObjectSize(false);
  };

  const handleChanges = (updatedData: any) => {
    setData(updatedData);
  };

  const sendJson = async ({
    api,
    loadingState,
  }: {
    api: string;
    loadingState: string;
  }) => {
    setApiResponse(null);
    if (api) {
      setApiEndpoint(api);
    }

    setLoadingStates((prev) => ({ ...prev, [loadingState]: true }));
    try {
      const dataStringified = JSON.stringify(data);
      const url = new URL(api);
      console.log("URL:", url);

      const options = {
        hostname: url.hostname,
        port: url.port,
        path: url.pathname,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(dataStringified),
        },
      };
      const req = http.request(options, (res: any) => {
        let responseBody = "";

        res.on("data", (chunk: any) => {
          responseBody += chunk.toString();
        });

        res.on("end", () => {
          try {
            const parsedResponse = JSON.parse(responseBody);
            console.log("Response:", parsedResponse);
            setApiResponse(parsedResponse);
            setLoadingStates((prev) => ({ ...prev, [loadingState]: false }));
          } catch (error) {
            console.error("Error parsing response:", error);
            setApiResponse(error as any);
          }
        });
      });

      req.on("error", (error: any) => {
        console.error("HTTP Request Error:", error.message);
        setLoadingStates((prev) => ({ ...prev, [loadingState]: false }));
        setApiResponse({ error: true, message: error.message } as any);
      });

      req.write(dataStringified);
      req.end();

      // setApiResponse(req.data);

      // console.log("Response:", req.data);
    } catch (error: any) {
      console.error("Error sending JSON:", error);
      setApiResponse(error);
    }
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, [loadingState]: false }));
    }, 1000);
  };

  return (
  
         
          <Fragment>
      <Grid
        container
        justifyContent={"center"}
        spacing={1}
        className={classes.container}
      sx={{marginTop:'10px'}}>
          
        <Grid item xs={12} lg={6}>
        <Accordion>
          <div className={classes.form}>
            {/* {console.log(data)} */}
            <JsonForms
              schema={schema}
              uischema={uischema}
              data={data}
              renderers={renderers}
              cells={materialCells}
              onChange={({ errors, data }) => handleChanges(data)}
            />
          </div>
          </Accordion>
        </Grid>
        
       
        <Grid item xs={12} lg={6}>
        <Accordion>
          <div className={classes.dataContent}>
            <Box>
              <FormControlLabel
                sx={formControlLabelStyle}
                control={
                  <Switch
                    disabled={displayRaw}
                    checked={displayObjectSize}
                    onChange={() => setDisplayObjectSize(!displayObjectSize)}
                    name="displayObjectSize"
                  />
                }
                label="Object Size"
              />
              <FormControlLabel
                sx={formControlLabelStyle}
                control={
                  <Switch
                    disabled={displayRaw}
                    checked={displayDataTypes}
                    onChange={() => setDisplayDataTypes(!displayDataTypes)}
                    name="displayDataTypes"
                  />
                }
                label="Data Types"
              />
              <FormControlLabel
                sx={formControlLabelStyle}
                control={
                  <Switch
                    checked={displayRaw}
                    onChange={toggleDisplayRaw}
                    name="displayRaw"
                  />
                }
                label="Raw"
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                overflowX: "scroll",
                scrollbarWidth: "none",
                borderRadius: "8px",
                border: `1.7px solid ${
                  theme.palette.mode === "dark" ? "#545454" : "#CBCBCB"
                }`,
              }}
            >
              <ReactJson
                style={{
                  display: `${displayRaw ? "none" : "block"}`,
                  backgroundColor: "hsla(0, 0, 0, 0)",
                  padding: "1rem",
                  width: "100%",
                }}
                src={data}
                iconStyle="square"
                collapseStringsAfterLength={50}
                displayObjectSize={displayObjectSize}
                theme={theme.palette.mode === "dark" ? "pop" : "rjv-default"}
                name={null}
                enableClipboard={true}
                displayDataTypes={displayDataTypes}
                indentWidth={4}
              />
              <code
                style={{
                  display: `${!displayRaw ? "none" : "block"}`,
                  padding: "1rem",
                }}
              >
                {JSON.stringify(data, null, 2)}
              </code>
            </Box>
          </div>
          </Accordion>
          <Grid container sx={{marginTop:'10px'}}>
            <Button
              className={classes.resetButton}
              onClick={clearData}
              color="error"
              variant="contained"
              endIcon={<DeleteIcon />}
            >
              Clear data
            </Button>
            <LoadingButton
              variant="contained"
              color="primary"
              loading={loadingStates.sendJsonLoading1}
              loadingPosition="end"
              onClick={() =>
                sendJson({
                  api: "http://164.52.200.229:9484/ner",
                  loadingState: "sendJsonLoading1",
                })
              }
              endIcon={<PersonSearchIcon />}
              className={classes.resetButton}
            >
              Extract NER
            </LoadingButton>
            {apiResponse && (
              <ResponseModal>
                <Typography variant="h5">Response</Typography>
                <h3>
                  Endpoint: <code className="blue">{apiEndpoint}</code>
                </h3>
                <ReactJson
                  style={{
                    display: `${displayRaw ? "none" : "block"}`,
                    backgroundColor: "hsla(0, 0, 0, 0)",
                    padding: "1rem",
                    width: "100%",
                  }}
                  src={apiResponse}
                  iconStyle="square"
                  collapseStringsAfterLength={50}
                  displayObjectSize={displayObjectSize}
                  theme={theme.palette.mode === "dark" ? "pop" : "rjv-default"}
                  name={null}
                  enableClipboard={true}
                  displayDataTypes={displayDataTypes}
                  indentWidth={4}
                />
              </ResponseModal>
            )}
          </Grid>
          
        </Grid>
       
      </Grid>
    </Fragment>
         
         
   
  );
};

export default App;

const formControlLabelStyle = {
  border: "1px solid rgba(126, 126, 126, 0.239)",
  borderRadius: "6px",
  margin: "0px 16px 16px 0px",
  padding: "4px 16px 4px 4px",
};

const useStyles = makeStyles({
  container: {
    padding: ".0em",
    width: "100%",
  },
  title: {
    textAlign: "center",
    padding: "0.25em",
  },
  dataContent: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100vw",
    padding: "1rem",
    justifyContent: "start",

    marginBottom: "1rem",
  },
  resetButton: {
    margin: "auto !important",
    // display: 'block !important',
    marginBottom: "2rem !important",
  },
  form: {
    padding: "1rem",
  },
  heading: {
    fontSize: "1.25rem",
  },
  apiResults: {
    display: "flex",
  },
  apiResultsJSON: {
    overflowX: "scroll",
  },
});
