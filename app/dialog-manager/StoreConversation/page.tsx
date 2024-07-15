"use client";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import React, { Fragment, useState } from "react";

import {
  
  Box,
  FormControlLabel,
  Grid,
  Button,
  SpellcheckIcon,
  SaveIcon,
  DeleteIcon,
  LoadingButton,
  Switch
} from "../../Components/muiIcons/muiIcons";

import Container from "../../Components/Container/Container";
import ResponseModal from "../../Components/Modal/Modal";
import clearJsonData from "./clearJsonData.json";
import initialJsonData from "./initialJsonData.json";
import schema from "./schema.json";
import uischema from "./uischema.json";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { processText, storeConversation } from "@/app/service/dialogmanager/service";
const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

const renderers = [...materialRenderers];

const App: React.FC = () => {
  const theme = useTheme();
  const classes = useStyles();
  const [displayObjectSize, setDisplayObjectSize] = useState<boolean>(false);
  const [displayDataTypes, setDisplayDataTypes] = useState<boolean>(false);
  const [displayRaw, setDisplayRaw] = useState<boolean>(false);

  const [loadingStates, setLoadingStates] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [data, setData] = useState<any>(initialJsonData);
  const [transformedData, setTransformedData] = useState({});

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
    setTransformedData(updatedData);
  };

  // const sendJson = async ({
  //   api,
  //   loadingState,
  // }: {
  //   api: string;
  //   loadingState: string;
  // }) => {
  //   setApiResponse(null);
  //   if (api) {
  //     setApiEndpoint(api);
  //   }

  //   setLoadingStates((prev) => ({ ...prev, [loadingState]: true }));
  //   try {
  //     const useProxyForKnownCorsIssues = process.env.REACT_APP_ENV
  //       ? true
  //       : false;

  //     const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
  //     const apiUrl = useProxyForKnownCorsIssues
  //       ? `${corsProxyUrl}${apiEndpoint}`
  //       : apiEndpoint;
  //     const response = await Axios.post(apiUrl, { data: transformedData });
  //     setApiResponse(response.data);
  //   } catch (error: any) {
  //     setApiResponse(error);
  //   }
  //   setTimeout(() => {
  //     setLoadingStates((prev) => ({ ...prev, [loadingState]: false }));
  //   }, 0);
  // };



  const handleStoreConversation = async (event: any) => {
    event.preventDefault(); 
    event.stopPropagation(); 

    try {
      const response = await storeConversation({ data: transformedData  });
      if (response) {
        toast.success(response.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    } catch (error) {
     
      toast.error('Failed to submit the form.');
    }

  
  };

  const handleProcessText = async (event: any) => {

    event.preventDefault();
    event.stopPropagation();
    try {
      const response = await processText({ data: transformedData  });
      if (response) {
        toast.success(response.message);
      } else {
        toast.error('An unknown error occurred.');
      }
    } catch (error) {
     
      toast.error('Failed to submit the form.');
    }
  
  };

  return (
    <Container>
      <Fragment>
        <Grid
          container
          justifyContent={"center"}
          spacing={1}
          className={classes.container}
        >
          <Grid item xs={12} lg={6}>
            <div className={classes.form}>
              <JsonForms
                schema={schema}
                uischema={uischema}
                data={data}
                renderers={renderers}
                cells={materialCells}
                onChange={({ errors, data }) => handleChanges(data)}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
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
                  src={transformedData}
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
                  {JSON.stringify(transformedData, null, 2)}
                </code>
              </Box>
            </div>
            <Grid container>
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
                onClick={handleStoreConversation}
                endIcon={<SaveIcon />}
                className={classes.resetButton}
              >
                Store Conversation
              </LoadingButton>
              <LoadingButton
                variant="contained"
                color="primary"
                loading={loadingStates.sendJsonLoading2}
                loadingPosition="end"
                onClick={handleProcessText}
                endIcon={<SpellcheckIcon />}
                className={classes.resetButton}
              >
                Process Text
              </LoadingButton>
              {/* {apiResponse && (
                <ResponseModal>
                  <h2>Response</h2>
                  <h3>
                    Endpoint: <code className="blue">{apiEndpoint}</code>
                  </h3>
                  <ReactJson
                    style={{
                      backgroundColor: "hsla(0, 0, 0, 0)",
                    }}
                    src={apiResponse}
                    iconStyle="square"
                    collapseStringsAfterLength={50}
                    displayObjectSize={displayObjectSize}
                    theme={
                      theme.palette.mode === "dark" ? "pop" : "rjv-default"
                    }
                    name={null}
                    enableClipboard={true}
                    displayDataTypes={displayDataTypes}
                    indentWidth={4}
                  />
                </ResponseModal>
              )} */}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    </Container>
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
