import { FeatureCollection } from "geojson";
import { getScaledValue } from "./getScaledValue";

export function updateColorScale(
  featureCollection: any,
  count: Map<string, number>
) {
  const { features } = featureCollection;

  return {
    type: "FeatureCollection",
    features: features.map((f: any) => {
      const properties = {
        ...f.properties,
        count: count.get(f.properties.name) || 0,
        scale:
          Math.round(
            getScaledValue(
              count.get(f.properties.name)!,
              0,
              Math.max(...count.values()),
              0,
              8
            )
          ) || 0,
      };
      return { ...f, properties };
    }),
  } as FeatureCollection;
}
