import IDataRow from "types/IDataRow";

export function dataToCount(data: IDataRow[]) {
  const result = data.filter((row: IDataRow) => row["預測結果"]);

  let cityArr = result.map((row: IDataRow) => row["居住地區"]);

  cityArr = cityArr.map((city: string) => city.split(/[市縣]/)[0]);

  const count = cityArr.reduce(
    (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
    new Map()
  );

  return count;
}
