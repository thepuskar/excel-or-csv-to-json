import * as XLSX from "xlsx";

export function csvToJson(file: File): Promise<{ [key: string]: any }[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const data = event.target!.result as string;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const result = XLSX.utils.sheet_to_json(sheet, {
        header: 1, // Use the first row as headers
        raw: true, // Include empty values as raw values (not parsed)
        defval: "",
      });
      const headers = result[0] as string[];
      const keyValuePairs = result.slice(1).map((row: any) => {
        const keyValue: { [key: string]: any } = {};
        for (let i = 0; i < headers.length; i++) {
          keyValue[headers[i]] = row[i];
        }
        return keyValue;
      });
      resolve(keyValuePairs); // Resolve the Promise with the key-value pairs
    };

    reader.onerror = function (event) {
      reject(event.target?.error);
    };

    reader.readAsBinaryString(file);
  });
}
