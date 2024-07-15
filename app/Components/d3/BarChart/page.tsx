"use client";
import { Divider, Paper, useTheme } from "@mui/material";
import * as d3 from "d3";
import { max } from "d3-array";
import { axisBottom, axisLeft } from "d3-axis";
import { easeExpInOut } from "d3-ease";
import { scaleBand, scaleLinear, scaleOrdinal } from "d3-scale";
import { useEffect, useRef, useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
export interface props {
  data: { [key: string]: any }[];
  dataKey: string;
  labelKey: string;
  containerRef: React.RefObject<HTMLDivElement>;
}

const BarChart: React.FC<props> = ({ data, dataKey, labelKey, containerRef }) => {
  const theme = useTheme();
  const svgRef = useRef<SVGSVGElement>(null);
  const [colorStyle, setColorStyle] = useState<string>("classic");
  const [tooltip, setTooltip] = useState({
    visible: false,
    label: "",
    data: "",
    x: 0,
    y: 0,
  });
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
        setSize({
          width: width,
          height: height,
          chartWidth: width - 2 * size.margin,
          chartHeight: height - 1.5 * size.margin,
          margin: size.margin,
        });
      }
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef,size.margin]);
    
    const toggleColorStyle = () => {
      if (colorStyle === "colorful") {
      setColorStyle("classic");
      } else if (colorStyle === "classic") {
      setColorStyle("mono");
      } else {
      setColorStyle("colorful");
      }
    };
  useEffect(() => {
    if (!data.length) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const colorful = [
      "#88c68c",
      "#36a2eb",
      "#cc65fe",
      "#ffce56",
      "#54b093",
      "#ff9f40",
      "#4bc0c0",
      "#9966ff",
      "#ff6384",
      "#36a2eb",
    ];
    const mono = [
      "#0078D4"
    ];
    
    const classic = [
     isDarkMode ? "#fff" : "#000",
    ];
    const actualColors = colorStyle === "colorful" ? colorful : colorStyle === "mono" ? mono : classic;
    const color = scaleOrdinal(actualColors); 


    

    const maxNumber = max(data, (d) => d[dataKey]) ?? 0;
    const y = scaleLinear().domain([0, maxNumber]).range([size.chartHeight, 0]);
    const x = scaleBand()
      .domain(data.map((d) => d[labelKey]))
      .range([0, size.chartWidth])
      .padding(0.3);

    const g = svg.append("g").attr("transform", `translate(${size.margin}, 10)`);

    const xAxisGroup = g
      .append("g")
      .attr("transform", `translate(0, ${size.chartHeight})`)
      .call(axisBottom(x));

    
    xAxisGroup
      .selectAll("text")
      .data(data) 
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-45)")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .on("mouseover", (event, d) => {
        setTooltip({
          visible: true,
          label: `${d[labelKey]}`,
          data: `${d[dataKey]}`,
          x: event.pageX,
          y: event.pageY,
        });
      })
      .on("mousemove", (event) => {
        setTooltip((prev) => ({
          ...prev,
          x: event.pageX,
          y: event.pageY,
        }));
      })
      .on("mouseout", () => {
        setTooltip((prev) => ({
          ...prev,
          visible: false,
        }));
      });
    xAxisGroup
      .selectAll("text")
      .style("font-family", "'Space Mono', monospace")
      .style("font-size", "0.8rem");

    const yAxisGroup = g.append("g").call(axisLeft(y));
    yAxisGroup
      .selectAll("text")
      .style("font-family", "'Space Mono', monospace")
      .style("font-size", "0.8rem");

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d[labelKey])!)
      .attr("y", size.chartHeight)
      .attr("width", x.bandwidth())
      .attr("rx", 10) 
      .attr("ry", 0) 
      .attr("borderRadius", 100)
      
      .attr("fill", (d, i) => color(i.toString()))

      .on("mouseover", (event, d) => {
        setTooltip({
          visible: true,
          label: `${d[labelKey]}`,
          data: `${d[dataKey]}`,
          x: event.pageX,
          y: event.pageY,
        });
      })
      .on("mousemove", (event) => {
        setTooltip((prevTooltip) => ({
          ...prevTooltip,
          x: event.pageX,
          y: event.pageY,
        }));
      })
      .on("mouseout", () => setTooltip({ ...tooltip, visible: false }))
      .transition()
      .duration(1000)
      .ease(easeExpInOut)
      .delay((d, i) => i * 50)
      .attr("y", (d) => y(d[dataKey]))
      .attr("height", (d) => size.chartHeight - y(d[dataKey]));
  }, [data, dataKey, labelKey, size, isDarkMode, colorStyle,tooltip]);

  return (
    <div className="h-full font-sans">


      {tooltip.visible && (
        <Paper
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 100,
            transform: `translate(${tooltip.x}px, ${tooltip.y}px) translate(-50%, -120%)`,
            transition: "transform 1s cubic-bezier(0,.08,.14,1.59)",
            visibility: tooltip.visible ? "visible" : "hidden",
            backdropFilter: "blur(10px)",
            pointerEvents: "none",
          }}
          className="tooltip"
        >
          {labelKey != dataKey && (
            <div className="py-2 px-4 grid grid-flow-col">
              <span className="pr-2">{labelKey}</span>
              <span>:</span>
              <span className="pl-2">{tooltip.label}</span>
            </div>
          )}
          <Divider />
          <div className="py-2 px-4 grid grid-flow-col">
            <span className="pr-2">{dataKey}</span>
            <span>:</span>
            <span className="pl-2">{tooltip.data}</span>
          </div>
        </Paper>
      )}
      <div className="relative" ref={containerRef}>
      <ToggleButton onClick={toggleColorStyle} className=" absolute right-0 top-0 mr-10" value="web"> <FormatColorFillIcon className="mr-2" />{colorStyle}</ToggleButton>
        <svg ref={svgRef} width={size.width} height={size.height}></svg>
      </div>
    </div>
  );
}
export default BarChart;
