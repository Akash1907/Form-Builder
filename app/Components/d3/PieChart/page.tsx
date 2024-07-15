// // @ts-nocheck
// "use client";
// import { Divider, Paper, Typography, useTheme } from "@mui/material";
// import { PieArcDatum, pie, arc, scaleOrdinal, schemeCategory10 } from "d3";
// import { FC, useEffect, useRef, useState } from "react";

// interface PieChartProps {
//   data: PieChartDataItem[];
//   dataKey: string;
//   labelKey: string;
//   containerRef: React.RefObject<HTMLDivElement>;
// }
// interface PieChartDataItem {
//   [key: string]: any;
// }

// const PieChart = ({ data, dataKey, labelKey, containerRef }: PieChartProps) => {
//   const theme = useTheme();
//   const svgRef = useRef<SVGSVGElement>(null);

//   const [size, setSize] = useState({
//     width: 0,
//     height: 0,
//     chartWidth: 0,
//     chartHeight: 0,
//     margin: 70,
//   });
//   const isDarkMode = theme.palette.mode === "dark";
//   useEffect(() => {
//     const resizeObserver = new ResizeObserver((entries) => {
//       for (let entry of entries) {
//         const { width, height } = entry.contentRect;
//         const margin = parseFloat(
//           getComputedStyle(document.documentElement).fontSize
//         );
//         setSize({
//           width: width,
//           height: height,
//           chartWidth: width - 2 * size.margin,
//           chartHeight: height - 1.5 * size.margin,
//           margin: size.margin,
//         });
//       }
//     });

//     if (containerRef.current) {
//       resizeObserver.observe(containerRef.current);
//     }

//     return () => {
//       resizeObserver.disconnect();
//     };
//   }, [containerRef, size.margin]);

//   // Dimensions
//   const width = Math.min(size.width, size.height);
//   const height = Math.min(size.width, size.height);
//   const radius = Math.min(width, height) / 2 - size.margin;

//   // Create a pie function
//   const pieGenerator = pie<PieChartDataItem>()
//     .sort(null)
//     .value((d) => parseFloat(d[dataKey]));

//   // Create an arc generator
//   const arcGenerator = arc<PieArcDatum<PieChartDataItem>>()
//     .innerRadius(0)
//     .outerRadius(radius);

//   // Color scale
//   // const color = scaleOrdinal(schemeCategory10);
//   const customColors = [
//     "#88c68c",
//     "#36a2eb",
//     "#cc65fe",
//     "#ffce56",
//     "#c9cbcf",
//     "#ff9f40",
//     "#4bc0c0",
//     "#9966ff",
//     "#ff6384",
//     "#36a2eb",
//   ];
//   const color = scaleOrdinal(customColors);

//   // Generate pie chart data
//   const arcs = pieGenerator(data);

//   // Tooltip state
//   const [tooltip, setTooltip] = useState<{
//     x?: number;
//     y?: number;
//     label?: string;
//     value?: number;
//     message?: string;
//     visible: boolean;
//   }>({
//     x: 0,
//     y: 0,
//     label: "",
//     value: 0,
//     visible: false,
//   });

  
//   const handleMouseOver = (
//     event: React.MouseEvent<SVGPathElement, MouseEvent>,
//     d: PieArcDatum<PieChartDataItem>
//   ) => {
//     if (!svgRef.current) return; 

//     const rect = svgRef.current.getBoundingClientRect();
//     const [x, y] = arcGenerator.centroid(d);

   
//     const tooltipX = event.clientX - rect.left;
//     const tooltipY = event.clientY - rect.top;

//     const label = d.data[labelKey];
//     const value = parseFloat(d.data[dataKey]);

//     setTooltip({
//       x: tooltipX,
//       y: tooltipY,
//       label: label,
//       value: value,
//       visible: true,
//     });
//   };

//   const handleMouseOut = () => {
//     setTooltip((prev) => ({ ...prev, visible: false }));
//   };
//   const handleClick = () => {
//     console.log("clicked");
//     const copy = `${tooltip.label} : ${tooltip.value}`;
//     navigator.clipboard.writeText(copy);
//     setTooltip({
//       label: undefined,
//       value: undefined,
//       message: "value",
//       visible: true,
//     });
//   };

//   return (
//     <div
//       ref={containerRef}
//       style={{ display: "flex", flexWrap: "wrap", position: "relative" }}
//     >
//       <svg ref={svgRef} width={width} height={height}>
//         <g transform={`translate(${width / 2}, ${height / 2})`}>
//           {arcs.map((d, i) => (
//             <g key={i}>
//               <path
//                 className="font-mono"
//                 d={arcGenerator(d) as string}
//                 fill={`${color(i.toString())}22`}
//                 stroke={color(i.toString())}
//                 strokeWidth={5}
//                 style={{
//                   cursor: "pointer",
//                 }}
//                 textAnchor="middle"
//                 onMouseOver={(e) => handleMouseOver(e, d)}
//                 onMouseMove={(e) => handleMouseOver(e, d)}
//                 onMouseOut={handleMouseOut}
//                 onClick={handleClick}
//               />

//               <text
//                 pointerEvents={"none"}
//                 transform={`translate(${arcGenerator.centroid(d)})`}
//                 textAnchor="middle"
//                 alignmentBaseline="middle"
//                 fill={`${isDarkMode ? "#fff" : "#000"}`}
//               >
//                 {d.data[labelKey]}
//               </text>
//             </g>
//           ))}
//         </g>
//       </svg>
//       {tooltip.visible && (
//         <Paper
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             transform: `translate(${tooltip.x}px, ${tooltip.y}px) translate(-50%, -120%)`,
//             transition: "transform 1s cubic-bezier(0,.08,.14,1.59)",
//             visibility: tooltip.visible ? "visible" : "hidden",
//             backdropFilter: "blur(10px)",
//             pointerEvents: "none",
//           }}
//           className="tooltip"
//         >
//           {tooltip.label && labelKey != dataKey && (
//             <>
//               <div className="py-2 px-4 grid grid-flow-col">
//                 <span className="pr-2">
//                   {labelKey.replace(/TRIM\(`|`\)/g, "")}
//                 </span>
//                 <span>:</span>
//                 <span className="pl-2">{tooltip.label}</span>
//               </div>
//               <Divider />
//             </>
//           )}
//           {tooltip.value && (
//             <div className="py-2 px-4 grid grid-flow-col">
//               <span className="pr-2">{dataKey}</span>
//               <span>:</span>
//               <span className="pl-2">{tooltip.value}</span>
//             </div>
//           )}
//           {tooltip.message && (
//             <div className="py-2 px-4 grid grid-flow-col">
//               <span className="pl-2">Copied to Clipboard</span>
//             </div>
//           )}
//         </Paper>
//       )}
//       <div>
//         {arcs.map((d, i) => (
//           <div key={i}>
//             <div className="flex m-2 items-center">
//               <span
//                 style={{ background: `${color(i.toString())}` }}
//                 className={`w-4 h-4 rounded`}
//               />
//               <span className="ml-2">{d.data[labelKey]}</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PieChart;

// @ts-nocheck
"use client";
import { Divider, Paper, Typography, useTheme } from "@mui/material";
import { PieArcDatum, pie, arc, scaleOrdinal, schemeCategory10 } from "d3";
import { FC, useEffect, useRef, useState } from "react";

interface PieChartProps {
  data: PieChartDataItem[];
  dataKey: string;
  labelKey: string;
  containerRef: React.RefObject<HTMLDivElement>;
}
interface PieChartDataItem {
  [key: string]: any;
}

const PieChart: FC<PieChartProps> = ({ data = [], dataKey, labelKey, containerRef }) => {
  const theme = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);

  const [size, setSize] = useState({
    width: 0,
    height: 0,
    chartWidth: 0,
    chartHeight: 0,
    margin: 70,
  });
  
  const isDarkMode = theme.palette.mode === "dark";

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const margin = parseFloat(
          getComputedStyle(document.documentElement).fontSize
        );
        setSize((prevSize) => ({
          ...prevSize,
          width: width,
          height: height,
          chartWidth: width - 2 * prevSize.margin,
          chartHeight: height - 1.5 * prevSize.margin,
        }));
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  // Dimensions
  const width = Math.min(size.width, size.height);
  const height = Math.min(size.width, size.height);
  const radius = Math.min(width, height) / 2 - size.margin;

  // Create a pie function
  const pieGenerator = pie<PieChartDataItem>()
    .sort(null)
    .value((d) => parseFloat(d[dataKey]));

  // Create an arc generator
  const arcGenerator = arc<PieArcDatum<PieChartDataItem>>()
    .innerRadius(0)
    .outerRadius(radius);

  // Color scale
  const customColors = [
    "#88c68c",
    "#36a2eb",
    "#cc65fe",
    "#ffce56",
    "#c9cbcf",
    "#ff9f40",
    "#4bc0c0",
    "#9966ff",
    "#ff6384",
    "#36a2eb",
  ];
  const color = scaleOrdinal(customColors);

  // Generate pie chart data
  const arcs = data.length > 0 ? pieGenerator(data) : [];

  // Tooltip state
  const [tooltip, setTooltip] = useState<{
    x?: number;
    y?: number;
    label?: string;
    value?: number;
    message?: string;
    visible: boolean;
  }>({
    x: 0,
    y: 0,
    label: "",
    value: 0,
    visible: false,
  });

  const handleMouseOver = (
    event: React.MouseEvent<SVGPathElement, MouseEvent>,
    d: PieArcDatum<PieChartDataItem>
  ) => {
    if (!svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const [x, y] = arcGenerator.centroid(d);

    const tooltipX = event.clientX - rect.left;
    const tooltipY = event.clientY - rect.top;

    const label = d.data[labelKey];
    const value = parseFloat(d.data[dataKey]);

    setTooltip({
      x: tooltipX,
      y: tooltipY,
      label: label,
      value: value,
      visible: true,
    });
  };

  const handleMouseOut = () => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  };

  const handleClick = () => {
    console.log("clicked");
    const copy = `${tooltip.label} : ${tooltip.value}`;
    navigator.clipboard.writeText(copy);
    setTooltip({
      label: undefined,
      value: undefined,
      message: "value",
      visible: true,
    });
  };

  return (
    <div
      ref={containerRef}
      style={{ display: "flex", flexWrap: "wrap", position: "relative" }}
    >
      <svg ref={svgRef} width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          {arcs.map((d, i) => (
            <g key={i}>
              <path
                className="font-mono"
                d={arcGenerator(d) as string}
                fill={`${color(i.toString())}22`}
                stroke={color(i.toString())}
                strokeWidth={5}
                style={{
                  cursor: "pointer",
                }}
                textAnchor="middle"
                onMouseOver={(e) => handleMouseOver(e, d)}
                onMouseMove={(e) => handleMouseOver(e, d)}
                onMouseOut={handleMouseOut}
                onClick={handleClick}
              />

              <text
                pointerEvents={"none"}
                transform={`translate(${arcGenerator.centroid(d)})`}
                textAnchor="middle"
                alignmentBaseline="middle"
                fill={`${isDarkMode ? "#fff" : "#000"}`}
              >
                {d.data[labelKey]}
              </text>
            </g>
          ))}
        </g>
      </svg>
      {tooltip.visible && (
        <Paper
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translate(${tooltip.x}px, ${tooltip.y}px) translate(-50%, -120%)`,
            transition: "transform 1s cubic-bezier(0,.08,.14,1.59)",
            visibility: tooltip.visible ? "visible" : "hidden",
            backdropFilter: "blur(10px)",
            pointerEvents: "none",
          }}
          className="tooltip"
        >
          {tooltip.label && labelKey !== dataKey && (
            <>
              <div className="py-2 px-4 grid grid-flow-col">
                <span className="pr-2">
                  {labelKey.replace(/TRIM\(`|`\)/g, "")}
                </span>
                <span>:</span>
                <span className="pl-2">{tooltip.label}</span>
              </div>
              <Divider />
            </>
          )}
          {tooltip.value && (
            <div className="py-2 px-4 grid grid-flow-col">
              <span className="pr-2">{dataKey}</span>
              <span>:</span>
              <span className="pl-2">{tooltip.value}</span>
            </div>
          )}
          {tooltip.message && (
            <div className="py-2 px-4 grid grid-flow-col">
              <span className="pl-2">Copied to Clipboard</span>
            </div>
          )}
        </Paper>
      )}
      <div>
        {arcs.map((d, i) => (
          <div key={i}>
            <div className="flex m-2 items-center">
              <span
                style={{ background: `${color(i.toString())}` }}
                className={`w-4 h-4 rounded`}
              />
              <span className="ml-2">{d.data[labelKey]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChart;
