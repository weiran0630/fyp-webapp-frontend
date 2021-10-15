import React, { useState, useEffect, useCallback } from "react";
import ReactMapGL, { Source, Layer, MapEvent, Popup } from "react-map-gl";
import { FeatureCollection } from "geojson";
import { Box, Text } from "@chakra-ui/layout";
import { useColorMode } from "@chakra-ui/color-mode";

import IDataRow from "types/IDataRow";
import { dataLayer, highlightLayer } from "./layers";
import { dataToCount } from "../../utils/dataToCount";
import { updateColorScale } from "../../utils/updateCount";
import Panel from "./panel";

interface MapProps {
  predictedData: IDataRow[];
}
export default function Map({ predictedData }: MapProps) {
  const { colorMode } = useColorMode();
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 600,
    latitude: 23.6978,
    longitude: 120.9605,
    zoom: 6.7,
    bearing: 0,
    pitch: 0,
  });

  const [settings, _] = useState({
    dragPan: true,
    dragRotate: true,
    scrollZoom: true,
    touchZoom: true,
    touchRotate: true,
    keyboard: true,
    doubleClickZoom: true,
    minZoom: 5,
    maxZoom: 7,
  });

  const [hoverInfo, setHoverInfo] = useState<{
    longitude: number;
    latitude: number;
    name: string;
    count: number;
  } | null>(null);

  useEffect(() => {
    const res = require("./data/taiwan-map.geo.json");
    setGeoData(updateColorScale(res, dataToCount(predictedData)));
  }, [predictedData]);

  const onHover = useCallback((event: MapEvent) => {
    const {
      features,
      lngLat: [lng, lat],
    } = event;

    const hoveredFeature = features && features[0];

    setHoverInfo({
      longitude: lng,
      latitude: lat,
      name: hoveredFeature?.properties?.name,
      count: hoveredFeature?.properties?.count,
    });
  }, []);

  const selectedCounty = (hoverInfo && hoverInfo.name) || "";

  return (
    <Box borderWidth={0} overflow="hidden" borderRadius={6}>
      <ReactMapGL
        {...settings}
        {...viewport}
        mapStyle={`mapbox://styles/mapbox/${colorMode}-v9`}
        mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        onViewportChange={setViewport}
        onHover={onHover}
      >
        <Source type="geojson" data={geoData!}>
          <Layer {...dataLayer} />

          <Layer {...highlightLayer} filter={["in", "name", selectedCounty]} />
        </Source>

        <Panel />

        {selectedCounty && (
          <Popup
            longitude={hoverInfo?.longitude!}
            latitude={hoverInfo?.latitude!}
            closeButton={false}
          >
            <Box textColor="black">
              <Text fontSize="sm">地區：{hoverInfo?.name}</Text>

              <Text fontSize="smaller" fontWeight="bold">
                預測錄取人數：
                {hoverInfo?.count}
              </Text>
            </Box>
          </Popup>
        )}
      </ReactMapGL>
    </Box>
  );
}
