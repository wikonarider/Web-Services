import React, { memo } from "react";
import { geoCentroid } from "d3-geo";
import argentina from "./argentina-provinces.json";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
  Marker,
} from "react-simple-maps";
import Box from "@mui/material/Box";
import MapStyle from "./map.module.css";
import { styles } from "../AdminStyles";
import { useSelector } from "react-redux";
// const geoUrl = "json!./argentina-provinces.json";

export function MapChart({ setTooltipContent, info, setOpen }) {
  const darkGlobal = useSelector((state) => state.darkTheme);
  let darkLight = darkGlobal ? "dark" : "light";
  return (
    <Box
      className={MapStyle.map}
      position="absolute"
      sx={{ width: "300px", height: "400px", overflow: "hidden" }}
    >
      <ComposableMap data-tip="" width={300} height={400}>
        <ZoomableGroup zoom={3.5} center={[-65, -38]}>
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
                      onClick={() => (n_services > 0 ? setOpen(ID_1) : null)}
                      style={{
                        default: {
                          fill:
                            n_services > 0
                              ? styles[darkLight].map.filled.backgroundColor
                              : styles[darkLight].map.empty.backgroundColor,
                          outline: "none",
                        },
                        hover: {
                          fill: styles[darkLight].map.filled.backgroundColor,
                          opacity: 0.4,
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

                  const { ID_1 } = geo.properties;

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
