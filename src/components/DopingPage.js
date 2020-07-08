import React from "react";
import { PureComponent } from "react";
import * as d3 from "d3";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  Label,
  ZAxis,
} from "recharts";

// Display dimensions
const width = 1000;
const height = 600;
const padding = 50;

class DopingPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      years: [],
      results: [],
      coordinates: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    )
      .then((Response) => Response.json())
      .then((data) => {
        const years = data.map((element) => element.Year);
        const results = data.map((element) => element.Seconds);

        const coordinates = data.map((element) => {
          return {
            x: element.Year,
            y: element.Seconds,
            z: element.Doping,
          };
        });

        this.setState(() => ({
          years,
          results,
          coordinates,
          data,
        }));
      });
  }

  render() {
    const { data, years, results, coordinates } = this.state;

    return (
      <div
        style={{
          width: "100vw",
          height: "100%",
          margin: 0,
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <header style={{ textAlign: "center" }}>
          <p id="title" style={{ fontSize: "1.75rem" }}>
            Doping in Professional Bicycle Racing (1994 - 2015)
          </p>
          <p id="subTitle" style={{ fontSize: "1.25rem", marginTop: "-1rem" }}>
            35 fastest times up Alpe d'Huez
          </p>
        </header>

        <ScatterChart
          width={width}
          height={height}
          margin={{ top: 50, bottom: 50, left: 50, right: 50 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="x" // actual coordinates data comes from here
            name="Year" // label name for what's on axis (and Tooltip)
            type="number"
            domain={[Math.min(years), Math.max(years)]}
            padding={{ left: 30, right: 30 }}
            tickCount={12}
            tick={{ fontWeight: "600" }}
            label={{
              value: "Tournament Years",
              angle: 0,
              position: "insideBottomRight",
              offset: 50,
            }}
          >
            {/*  NOTE: THERE ARE AS MANY DEFAULT LEGENDS AS THERE ARE 
        SETS OF DATA (ARRAYS OF OBJECTS) AND THEREFORE <SCATTER /> ELEMENTS. 
        FOR EACH SET, LEGEND ALLOWS A CUSTOM TEXT AND GIVES IT THE 
        COLOR CODE AND SHAPE THAT <SCATTER HAS>    
        */}
          </XAxis>
          <YAxis
            dataKey="y"
            name="Result time"
            type="number"
            domain={[Math.min(results), Math.max(results)]}
            padding={{ bottom: 30, top: 30 }}
            tickCount={14}
            tick={{ fontWeight: "600" }}
            tickFormatter={(value) => {
              let minutes = Math.trunc(value / 60).toString();
              let seconds = (value % 60).toString();
              return seconds.length === 2
                ? `${minutes}:${seconds}`
                : `${minutes}:0${seconds}`;
            }}
            label={{
              value: "Cycler Result Times",
              angle: -90,
              position: "insideLeft",
              offset: 70,
            }}
          />
          <ZAxis dataKey={"z"} name="Notes" />

          <Tooltip
            wrapperStyle={{
              opacity: 0.75,
              color: "#33adff",

              fontWeight: 600,
              textAlign: "left",
            }}
            separator=" - "
            // TOOLTIP DATA FORMATTING STILL NEEDS SOME RESEARCH...
            //  formatter={(value) =>
            //    Math.trunc(value / 60).toString() + ":" + (value % 60).toString()
            //  }
          />

          <Scatter
            shape="circle"
            name="Result times "
            data={coordinates}
            fill="#8884d8"
          >
            {data.map((value, index) => (
              <Cell
                className="dot"
                cursor="pointer"
                key={`cell-${index}`}
                fill={value.Doping ? "#f43128" : "#16f50a"}
                stroke="black"
              />
            ))}
          </Scatter>
        </ScatterChart>
      </div>
    );
  }
}
export default DopingPage;
