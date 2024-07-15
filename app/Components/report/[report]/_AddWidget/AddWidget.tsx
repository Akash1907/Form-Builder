// import { rankWith, scopeEndsWith } from "@jsonforms/core";
// import {
//   materialCells,
//   materialRenderers,
// } from "@jsonforms/material-renderers";
// import { JsonForms } from "@jsonforms/react";
// import { Divider, Paper, Typography } from "@mui/material";
// import { useContext, useEffect, useState } from "react";
// import schema from "./schema.json";
// import uischema from "./uischema.json";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import addMapping from "./addMapping";
// import addRule from "./addRule";
// import addTable from "./addTable";
// import columnsToshow from "./columnsToshow";
// import { useAppContext } from "@/app/Contexts/sharedata";
// import colorLebalPicker from "./colorLebalPicker";
// import ColorPicker from "./ColorPicker";
// import { useColorPickerContext } from "@/app/Contexts/sharePickerColor";


// const renderers = [
//   ...materialRenderers,
//   { tester: rankWith(1000, scopeEndsWith("table")), renderer: addTable },
//   { tester: rankWith(1000, scopeEndsWith("AddMapping")), renderer: addMapping },
//   { tester: rankWith(1000, scopeEndsWith("ColumnsToShow")), renderer: columnsToshow },
//   { tester: rankWith(1000, scopeEndsWith("AddRule")), renderer: addRule },
//   { tester: rankWith(1000, scopeEndsWith("addcolor")), renderer: ColorPicker },
//   { tester: rankWith(1000, scopeEndsWith("labelColor")), renderer: colorLebalPicker },
 
// ];

// const AddWidget = ({ toggleDrawer }: { toggleDrawer: (isOpen: boolean) => () => void }) => {
//   const [formsData, setFormsData] = useState<any[]>([
 
   
//       {
//           "widgetName": "",
//           "visualType": "",
//           "dataType": "",
//           "dataSource": "",
//           "pages": {
//               "buildQuery": {
//                   "table": {
//                       "table": "",
//                       "columns": "",
//                       "addcondition": [
//                           {
//                               "column": "",
//                               "operater": "",
//                               "Value": ""
//                           }
//                       ]
//                   },
//                   "AddMapping": {
//                       "addMapping": [
//                           {
//                               "MappedColumnsfrom": "",
//                               "MappedColumnsto": "",
//                               "JoinClause": ""
//                           }
//                       ]
//                   },
//                   "AddRule": {
//                       "addRule": [
//                           {
//                               "Name": "",
//                               "fromValue": "",
//                               "Operator": "",
//                               "toValue": ""
//                           }
//                       ]
//                   },
//                   "ColumnsToShow": {
//                       "columnsToshow": "",
//                       "groupedColumns": ""
//                   }
//               },
//               "nltosql": "",
//               "query": "",
//               "AddDrillDownQuery": [
//                   {
//                       "Title": "",
//                       "Yaxis": "",
//                       "Xaxis": "",
//                       "VisualType": "",
//                       "drillDownQuery": ""
//                   }
//               ],
//               "Alias": {
//                   "originalName": "",
//                   "aliasName": "",
//                   "searchText": ""
//               },
//               "configuration": {
//                   "fixedheader": true,
//                   "defaultPageSize": "",
//                   "columnForDateFilter": "",
//                   "AxisReferenceLabel": "",
//                   "addcolor":"",
//                   "labelColor":"",
//                   "AddBarData": [
//                       {
//                           "addBarColumn": ""
//                       }
//                   ]
//               }
//           }
//       }
  

    
//   ]);




//   const { state } = useAppContext();
//   const { colorState } = useColorPickerContext();
//   const [dynamicSchema, setDynamicSchema] = useState(schema);
//   const [dynamicUISchema, setDynamicUISchema] = useState(uischema);
 
//   // const updateEnum = (path: string, newEnumValues: any[]) => {
   
//   //   const keys = path.split(".");
//   //   let updatedSchema = { ...dynamicSchema };

//   //   const updateNestedObject = (obj: any, keys: any, newEnumValues: string[]) => {
//   //     const key = keys[0];
//   //     if (keys.length === 1) {
//   //       obj[key] = newEnumValues;
//   //     } else {
//   //       obj[key] = { ...obj[key] };
//   //       updateNestedObject(obj[key], keys.slice(1), newEnumValues);
//   //     }
//   //   };

//   //   updateNestedObject(updatedSchema, keys, newEnumValues);
//   //   return updatedSchema;
//   // };

//   useEffect(() => {
//     setDynamicSchema((prevSchema) => {
//       const uniqueColumns = new Set();
//       let color = ["#000000"];  
//       let colorLabel = ["#000000"];  
//       if (colorState.color !== undefined) {
//         color = Array.isArray(colorState.color) ? colorState.color : [colorState.color];
//       }
//       if (colorState.colorLabel !== undefined) {
//         colorLabel = Array.isArray(colorState.colorLabel) ? colorState.colorLabel : [colorState.colorLabel];
//       }
//       state.forEach((item: any) => {
//         item.columns.forEach((column: any) => {
//           uniqueColumns.add(`${column}`);
//         });
//       });

//       const result = Array.from(uniqueColumns);
//       const newSchema = JSON.parse(JSON.stringify(prevSchema));
//       const path = newSchema.properties.pages.properties.configuration;
//       path.properties.AddBarData.items.properties.addBarColumn.enum = result.length > 0 ? result : ['default'];
//       path.properties.AxisReferenceLabel.enum = result.length > 0 ? result : ['default'];
//       path.properties.addcolor.enum = color;
//       path.properties.labelColor.enum = colorLabel;


 
//       return newSchema;
//     });
//   }, [state,colorState]);
  



//   const handleChanges = (index: number, newData: any) => {

//     const newFormsData = [...formsData];
//     newFormsData[index] = newData;
//     console.log(formsData)
//     setFormsData(newFormsData);
  
//     // const tablePath = "properties.pages.properties.buildQuery.properties.table.items.properties.table.enum";
//     // const tableNames = datasource.tables.map((table) => table.table_name);
//     // let updatedSchema = updateEnum(tablePath, tableNames);

//     // const selectedTable = newData.pages.buildQuery.table[0].table;
//     // if (selectedTable) {
//     //   const selectedTableColumns = datasource.tables.find(
//     //     (table) => table.table_name === selectedTable
//     //   )?.columns.map((col) => col.column_name) || [""];

//     //   const schemaPath = "properties.pages.properties.buildQuery.properties.table.items.properties.columns.enum";
//     //   updatedSchema = updateEnum(schemaPath, selectedTableColumns);
//     // }

//     // setDynamicSchema(updatedSchema);
//   };

//   const handleClose = () => {
//     toggleDrawer(false)();
//   };

//   return (
//     <div className="m-4">
//       <Box sx={{ flexGrow: 1, width: "100%"}}>
//         <Grid
//           container
//           direction="row"
//           justifyContent="space-between"
//           alignItems="center"
//           spacing={2}
//         >
//           <Grid item xs={3}>
//             <Typography variant={"h5"}>Add New Widget</Typography>
//           </Grid>
//           <Grid item xs={3} sx={{ textAlign: "right" }}>
//             <Button variant="contained" onClick={handleClose}>
//               Close
//             </Button>
//           </Grid>
//         </Grid>
//         <Divider />
//         <Paper sx={{ p: 2 }}>
//           {formsData.map((formData, index) => (
//             <div key={index} style={{ marginBottom: "20px" }}>
//               <JsonForms
//                 schema={dynamicSchema}
//                 uischema={dynamicUISchema}
//                 data={formData}
//                 renderers={renderers}
//                 cells={materialCells}
//                 onChange={({ errors, data }) => handleChanges(index, data)}
//               />
//             </div>
//           ))}
//         </Paper>
//         <Grid
//           container
//           direction="row"
//           justifyContent="space-between"
//           alignItems="left"
//           spacing={2}
//         >
//           <Grid item xs={3} sx={{ marginTop: '10px' }}>
//             <Button variant="contained" onClick={handleClose} sx={{ marginRight: '10px' }}>
//               Save
//             </Button>
//             <Button variant="contained" onClick={handleClose}>
//               View
//             </Button>
//           </Grid>
//           <Grid item xs={12}>
//             <div>{JSON.stringify(formsData, null, 2)}</div>
//           </Grid>
//         </Grid>
//       </Box>
//     </div>
//   );
// };

// export default AddWidget;


import { rankWith, scopeEndsWith } from "@jsonforms/core";
import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { Container, Divider, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import schema from "./schema.json";
import uischema from "./uischema.json";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import addMapping from "./addMapping";
import addRule from "./addRule";
import addTable from "./addTable";
import columnsToshow from "./columnsToshow";
import { useAppContext } from "@/app/Contexts/sharedata";
import colorLebalPicker from "./colorLebalPicker";
import ColorPicker from "./ColorPicker";
import { useColorPickerContext } from "@/app/Contexts/sharePickerColor";
import addBarColor from "./addBarColor";

const renderers = [
  ...materialRenderers,
  { tester: rankWith(1000, scopeEndsWith("table")), renderer: addTable },
  { tester: rankWith(1000, scopeEndsWith("AddMapping")), renderer: addMapping },
  { tester: rankWith(1000, scopeEndsWith("ColumnsToShow")), renderer: columnsToshow },
  { tester: rankWith(1000, scopeEndsWith("AddRule")), renderer: addRule },
  { tester: rankWith(1000, scopeEndsWith("addcolor")), renderer: ColorPicker },
  { tester: rankWith(1000, scopeEndsWith("labelColor")), renderer: colorLebalPicker },
  { tester: rankWith(1000, scopeEndsWith("addBarColor")), renderer: addBarColor },
];

const AddWidget = ({ toggleDrawer }: { toggleDrawer: (isOpen: boolean) => () => void }) => {
  const [formsData, setFormsData] = useState<any[]>([
    {
      "widgetName": "",
      "visualType": "",
      "dataType": "",
      "dataSource": "",
      "pages": {
        "buildQuery": {
          "table": {
            "table": "",
            "columns": "",
            "addcondition": [
              {
                "column": "",
                "operater": "",
                "Value": ""
              }
            ]
          },
          "AddMapping": {
            "addMapping": [
              {
                "MappedColumnsfrom": "",
                "MappedColumnsto": "",
                "JoinClause": ""
              }
            ]
          },
          "AddRule": {
            "addRule": [
              {
                "Name": "",
                "fromValue": "",
                "Operator": "",
                "toValue": ""
              }
            ]
          },
          "ColumnsToShow": {
            "columnsToshow": "",
            "groupedColumns": ""
          }
        },
        "nltosql": "",
        "query": "",
        "AddDrillDownQuery": [
          {
            "Title": "",
            "Yaxis": "",
            "Xaxis": "",
            "VisualType": "",
            "drillDownQuery": ""
          }
        ],
        "Alias": {
          "originalName": "",
          "aliasName": "",
          "searchText": ""
        },
        "configuration": {
          "fixedheader": true,
          "defaultPageSize": "",
          "columnForDateFilter": "",
          "AxisReferenceLabel": "",
          "addcolor": "",
          "labelColor": "",
          "AddBarData": [
            {
              "addBarColumn": "",
              "addBarColor":""
            }
          ]
        }
      }
    }
  ]);

  const { state } = useAppContext();
  const { colorState } = useColorPickerContext();
  const [dynamicSchema, setDynamicSchema] = useState(schema);
  const [dynamicUISchema, setDynamicUISchema] = useState(uischema);

  useEffect(() => {
    setDynamicSchema((prevSchema) => {
      const uniqueColumns = new Set();

      state.forEach((item: any) => {
        item.columns.forEach((column: any) => {
          uniqueColumns.add(`${column}`);
        });
      });

      const result = Array.from(uniqueColumns);
      const newSchema = JSON.parse(JSON.stringify(prevSchema));
      const path = newSchema.properties.pages.properties.configuration;
      path.properties.AddBarData.items.properties.addBarColumn.enum = result.length > 0 ? result : ['default'];
      path.properties.AxisReferenceLabel.enum = result.length > 0 ? result : ['default'];


      return newSchema;
    });
  }, [state, colorState]);

  useEffect(() => {
    setFormsData((prevFormsData) => {
      return prevFormsData.map((formData) => {
        const updatedFormData = { ...formData };
        updatedFormData.pages.configuration.addcolor = colorState.color;
        updatedFormData.pages.configuration.labelColor = colorState.colorLabel;
        updatedFormData.pages.configuration.AddBarData[0].addBarColor = colorState.addBarColor;
        return updatedFormData;
      });
    });
  }, [colorState.addBarColor, colorState.color, colorState.colorLabel]);

  const handleChanges = (index: number, newData: any) => {
    const newFormsData = [...formsData];
    newFormsData[index] = newData;
    setFormsData(newFormsData);
  };

  const handleClose = () => {
    toggleDrawer(false)();
  };

  return (
    <div className="m-4">
      <Container sx={{ width: "1100px" }}>
      <Box sx={{width: "100%" }}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        sx={{marginBottom:'10px'}}>
          <Grid item xs={3}>
            <Typography variant={"h5"}>Add New Widget</Typography>
          </Grid>
          <Grid item xs={3} sx={{ textAlign: "right" }}>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </Grid>
        </Grid>
      
        <Paper sx={{ p: 2 }}>
          {formsData.map((formData, index) => (
            <div key={index} style={{ marginBottom: "20px" }}>
              <JsonForms
                schema={dynamicSchema}
                uischema={dynamicUISchema}
                data={formData}
                renderers={renderers}
                cells={materialCells}
                onChange={({ errors, data }) => handleChanges(index, data)}
              />
            </div>
          ))}
        </Paper>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="left"
          spacing={2}
        >
          <Grid item xs={3} sx={{ marginTop: '10px' }}>
            <Button variant="contained" onClick={handleClose} sx={{ marginRight: '10px' }}>
              Save
            </Button>
            <Button variant="contained" onClick={handleClose}>
              View
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div>{JSON.stringify(formsData, null, 2)}</div>
          </Grid>
        </Grid>
      </Box>
      </Container>
     
    </div>
  );
};

export default AddWidget;

