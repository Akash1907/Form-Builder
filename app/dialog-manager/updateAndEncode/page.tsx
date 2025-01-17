"use client"
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import { JsonForms } from '@jsonforms/react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  FormControlLabel,
  Grid,
  Button,
  DeleteIcon,
  LoadingButton,
  Switch,
  SendIcon
} from "../../Components/muiIcons/muiIcons";
import { makeStyles } from '@mui/styles';
import Axios from 'axios';
import React, { Fragment, useState } from 'react';
import Container from '../../Components/Container/Container';
import ApiCustomRender from '../../Components/CustomRenders/ApiComponents/ApiCustomRender';
import { customControlWithButtonTester } from '../../Components/CustomRenders/ApiComponents/testers';
import ResponseModal from '../../Components/Modal/Modal';
import clearJsonData from './clearJsonData.json';
import initialJsonData from './initialJsonData.json';
import schema from './schema.json';
import uischema from './uischema.json';

import dynamic from 'next/dynamic';
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

const renderers = [
  ...materialRenderers,
  { tester: customControlWithButtonTester, renderer: ApiCustomRender },
];

const apiEndpoint = 'https://dev.assisto.tech/utility/update_and_encode';

const App: React.FC = () => {
  // USE STATES
  const theme = useTheme();
  const [displayObjectSize, setDisplayObjectSize] = useState<boolean>(false);
  const [displayDataTypes, setDisplayDataTypes] = useState<boolean>(false);
  const [displayRaw, setDisplayRaw] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState(null);
  const classes = useStyles();
  const [loadingStates, setLoadingStates] = React.useState<{
    [key: string]: boolean;
  }>({});
  const [data, setData] = useState<any>(initialJsonData);
  const [transformedData, setTransformedData] = useState({});

  // FUNCTIONS

  const clearData = () => {
    setData(clearJsonData);
    // setTransformedData({});
  };
  const toggleDisplayRaw = () => {
    setDisplayRaw(!displayRaw);
    setDisplayDataTypes(false);
    setDisplayObjectSize(false);
  };
  const formatNextNodeKeys = (data: any): any => {
    if (Array.isArray(data)) {
      return data.map(formatNextNodeKeys);
    } else if (typeof data === 'object' && data !== null) {
      const formattedObject: any = {};
      Object.keys(data).forEach((key) => {
        if (key === 'next_node' && typeof data[key] === 'string') {
          formattedObject[key] = data[key].toLowerCase().replace(/\s+/g, '-');
        } else if (key === 'next_node' && Array.isArray(data[key])) {
          formattedObject[key] = formatNextNodeKeys(data[key]);
        } else {
          formattedObject[key] = formatNextNodeKeys(data[key]);
        }
      });
      return formattedObject;
    }
    return data;
  };

  const handleChanges = (updatedData: any) => {
    setData(updatedData);
    setTransformedData(updatedData);
    console.log('Original data:', updatedData);
    if (updatedData.slots) {
      const transformedSlots = updatedData.slots.reduce(
        (acc: any, slot: any) => {
          const slotName = slot.form_name || 'name-not-specified';
          const transformedSlotName = slotName
            .toLowerCase()
            .replace(/\s+/g, '-');

          const formattedFormData = formatNextNodeKeys(slot.form_data);

          acc[transformedSlotName] = { ...formattedFormData };

          return acc;
        },
        {}
      );

      const tempTransformedData = {
        ...updatedData,
        slots: transformedSlots,
      };

      setTransformedData(tempTransformedData);
      console.log('Transformed data:', tempTransformedData);
    }
  };

  const sendJson = async () => {
    setApiResponse(null);

    setLoadingStates((prev) => ({ ...prev, sendJsonLoading: true }));
    try {
      const useProxyForKnownCorsIssues = process.env.REACT_APP_ENV?true:false;
      console.log('useProxy:', useProxyForKnownCorsIssues);
      const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';
      const apiUrl = useProxyForKnownCorsIssues
        ? `${corsProxyUrl}${apiEndpoint}`
        : apiEndpoint;
      const response = await Axios.post(apiUrl, transformedData);
      setApiResponse(response.data);

      console.log('Response:', response.data);
    } catch (error: any) {
      console.error('Error sending JSON:', error);
      setApiResponse(error);
    }
    setTimeout(() => {
      setLoadingStates((prev) => ({ ...prev, sendJsonLoading: false }));
    }, 0);
  };

  return (
    <Container>
      <Fragment>
        <Grid
          container
          justifyContent={'center'}
          spacing={1}
          className={classes.container}
        >
          <Grid item xs={12} lg={6}>
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
                      name='displayObjectSize'
                    />
                  }
                  label='Object Size'
                />
                <FormControlLabel
                  sx={formControlLabelStyle}
                  control={
                    <Switch
                      disabled={displayRaw}
                      checked={displayDataTypes}
                      onChange={() => setDisplayDataTypes(!displayDataTypes)}
                      name='displayDataTypes'
                    />
                  }
                  label='Data Types'
                />
                <FormControlLabel
                  sx={formControlLabelStyle}
                  control={
                    <Switch
                      checked={displayRaw}
                      onChange={toggleDisplayRaw}
                      name='displayRaw'
                    />
                  }
                  label='Raw'
                />
              </Box>
              <Box
                sx={{
                  width: '100%',
                  overflowX: 'scroll',
                  scrollbarWidth: 'none',
                  borderRadius: '8px',
                  border: `1.7px solid ${
                    theme.palette.mode === 'dark' ? '#545454' : '#CBCBCB'
                  }`,
                }}
              >
                <ReactJson
                  style={{
                    display: `${displayRaw ? 'none' : 'block'}`,
                    backgroundColor: 'hsla(0, 0, 0, 0)',
                    padding: '1rem',
                    width: '100%',
                  }}
                  src={transformedData}
                  iconStyle='square'
                  collapseStringsAfterLength={50}
                  displayObjectSize={displayObjectSize}
                  theme={theme.palette.mode === 'dark' ? 'pop' : 'rjv-default'}
                  name={null}
                  enableClipboard={true}
                  displayDataTypes={displayDataTypes}
                  indentWidth={4}
                />
                <code
                  style={{
                    display: `${!displayRaw ? 'none' : 'block'}`,
                    padding: '1rem',
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
                color='error'
                variant='contained'
                endIcon={<DeleteIcon />}
              >
                Clear data
              </Button>
              <LoadingButton
                variant='contained'
                color='primary'
                loading={loadingStates.sendJsonLoading}
                loadingPosition='end'
                onClick={() => sendJson()}
                endIcon={<SendIcon />}
                className={classes.resetButton}
              >
                Send data
              </LoadingButton>
              {apiResponse && (
                <ResponseModal>
                  <h2>Response</h2>
                  <h3>
                    Endpoint: <code className='blue'>{apiEndpoint}</code>
                  </h3>
                  <ReactJson
                    src={apiResponse}
                    style={{
                      backgroundColor: 'hsla(0, 0, 0, 0)',
                    }}
                    iconStyle='square'
                    collapseStringsAfterLength={50}
                    displayObjectSize={displayObjectSize}
                    theme={
                      theme.palette.mode === 'dark' ? 'pop' : 'rjv-default'
                    }
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
    </Container>
  );
};

export default App;

const formControlLabelStyle = {
  border: '1px solid rgba(126, 126, 126, 0.239)',
  borderRadius: '6px',
  margin: '0px 16px 16px 0px',
  padding: '4px 16px 4px 4px',
};

const useStyles = makeStyles({
  container: {
    padding: '.0em',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    padding: '0.25em',
  },
  dataContent: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100vw',
    padding: '1rem',
    justifyContent: 'start',

    marginBottom: '1rem',
  },
  resetButton: {
    margin: 'auto !important',
    // display: 'block !important',
    marginBottom: '2rem !important',
  },
  form: {
    padding: '1rem',
  },
  heading: {
    fontSize: '1.25rem',
  },
  apiResults: {
    display: 'flex',
  },
  apiResultsJSON: {
    overflowX: 'scroll',
  },
});


