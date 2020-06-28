import React from "react";
import { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
} from "recharts";

const width = 1000;
const height = 600;

class USgdpPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      activeIndex: 0,
    };
  }

  componentDidMount() {
    fetch(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState(() => ({
          list: data.data.map((element) => ({
            date: element[0],
            gdp: element[1],
          })),
          activeIndex: 0,
        }));
      });
  }

  handleMouseOver = (value, index) => {
    this.setState(() => ({
      activeIndex: index,
    }));
  };
  renderTooltip = (value, name) => {
    return ["$" + value.toString().replace(/(\d+)(?=\d{3})/, "$1,"), "GDP"];
  };

  quarterize = (label) => {
    let quarter = "";
    let temp = label.substring(5, 7);
    if (temp === "01") {
      quarter = "1st Quarter";
    } else if (temp === "04") {
      quarter = "2nd Quarter";
    } else if (temp === "07") {
      quarter = "3rd Quarter";
    } else if (temp === "10") {
      quarter = "4th Quarter";
    }

    return label.substring(0, 4) + " - " + quarter;
  };

  render() {
    const { list, activeIndex } = this.state;
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
        <header
          style={{
            textAlign: "center",
            fontSize: "1.75rem",
          }}
        >
          United States GDP (1947 - 2015)
        </header>
        <BarChart
          width={width}
          height={height}
          data={list}
          margin={{
            top: 50,
            right: 50,
            left: 50,
            bottom: 50,
          }}
          style={{ background: "white" }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(value) => value.slice(0, 4)}>
            <Label
              position="bottom"
              offset={45}
              style={{ fontWeight: "500", fontStyle: "italic" }}
            >
              Source: \"Federal Reserve Economic Data\" -
              \"http://research.stlouisfed.org/fred2/data/GDP.txt\"
            </Label>
          </XAxis>
          <YAxis
            allowDecimals={false}
            interval="preserveStartEnd"
            domain={[0, (dataMax) => Math.round(dataMax)]}
            tickFormatter={(value) =>
              "$" + value.toString().replace(/(\d+)(?=\d{3})/, "$1,")
            }
            tick={{ fontWeight: "600" }}
            label={{
              value: "Gross Domestic Product (Billions USD)",
              angle: -90,
              position: "insideBottomLeft",
              offset: 80,
            }}
          />
          <Tooltip
            wrapperStyle={{ opacity: 0.75, color: "#33adff", fontWeight: 600 }}
            offset={20}
            formatter={this.renderTooltip}
            labelFormatter={(label) => "Date: " + this.quarterize(label)}
            cursor={false}
          />

          <Legend
            align="right"
            iconType="square"
            iconSize={15}
            formatter={() => "Quarterly GDP"}
          />

          <Bar dataKey="gdp" fill="#33adff" onMouseOver={this.handleMouseOver}>
            {list.map((list, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? "white" : "#33adff"}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </div>
    );
  }
}

export default USgdpPage;
