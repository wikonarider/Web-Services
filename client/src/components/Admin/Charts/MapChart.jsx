import React, { memo } from "react";
import { geoCentroid } from "d3-geo";
import argentina from "./argentina-provinces.json";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
  Annotation,
} from "react-simple-maps";
import Box from "@mui/material/Box";
import Style from "./map.module.css";
// const geoUrl = "json!./argentina-provinces.json";

export function MapChart({ setTooltipContent, info }) {
  return (
    <Box
      className={Style.map}

      // sx={{ width: "200px", height: "400px", overflow: "hidden" }}
    >
      <ComposableMap data-tip="" width={200} height={300}>
        <ZoomableGroup zoom={2.7} center={[-65, -38]}>
          <Geographies geography={argentina}>
            {({ geographies }) => (
              <>
                {geographies.map((geo) => {
                  const { NAME_1, ID_1 } = geo.properties;
                  const n_services = info.find((p) => p.provinceId === ID_1)
                    ? info.find((p) => p.provinceId === ID_1).n_services
                    : 0;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={() => {
                        setTooltipContent(`${NAME_1} ${n_services}`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                      style={{
                        default: {
                          fill: n_services > 0 ? "#F53" : "rgb(112, 112, 112)",
                          outline: "none",
                        },
                        hover: {
                          fill: "#F53",
                          outline: "none",
                          cursor: "pointer",
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none",
                        },
                      }}
                    />
                  );
                })}

                {geographies.map((geo) => {
                  const centroid = geoCentroid(geo);

                  const { NAME_1, ID_1 } = geo.properties;
                  console.log(NAME_1, centroid);
                  const n_services = info.find((p) => p.provinceId === ID_1)
                    ? info.find((p) => p.provinceId === ID_1).n_services
                    : 0;
                  return (
                    <g key={geo.rsmKey + "-name"}>
                      {n_services > 0 && (
                        <Marker coordinates={centroid}>
                          <text y="2" fontSize={3} textAnchor="middle">
                            {`${
                              info.find((p) => p.provinceId === ID_1)
                                ? info.find((p) => p.provinceId === ID_1)
                                    .n_services
                                : 0
                            }`}
                          </text>
                        </Marker>
                      )}
                    </g>
                  );
                })}
              </>
            )}
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </Box>
  );
}

export default memo(MapChart);
