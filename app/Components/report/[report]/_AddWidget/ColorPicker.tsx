import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { Box, Accordion, AccordionDetails } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { useColorPickerContext } from "@/app/Contexts/sharePickerColor";


interface DataType {
  data?: any,
  handleChange?: any
}

const ColorPickerComponent = ({ data, handleChange }: DataType) => {
  const {setColorState } = useColorPickerContext();
  const [colorHexCode, setColorHexCode] = useState(data || "#000000");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColorChange = (color: any) => {
    setColorHexCode(color.hex);
    handleChange(color.hex);
    setColorState((prev: any) => ({ ...prev, color: color.hex }));
  };

  return (
    <Accordion defaultExpanded>
      <AccordionDetails>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Fab
            variant="extended"
            size="medium"
            color="secondary"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{ marginRight: "10px" }}
          >
            Color Picker
            <AddIcon />
          </Fab>

          <Box>
            <b>Color: </b>
            <span style={{ color: colorHexCode }}>{colorHexCode}</span>
          </Box>
        </Box>

        <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem>
            <SketchPicker color={colorHexCode} onChange={handleColorChange} />
          </MenuItem>
        </Menu>
      </AccordionDetails>
    </Accordion>
  );
};

const ColorPicker = withJsonFormsControlProps(ColorPickerComponent);
export default ColorPicker;
