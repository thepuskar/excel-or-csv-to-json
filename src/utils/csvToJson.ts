import * as XLSX from "xlsx";

/**
 * The `csvToJson` function converts a CSV file to JSON format using the XLSX library in TypeScript.
 * @param {File} file - The `file` parameter is of type `File`, which represents a file selected by the
 * user through an input element. It contains information about the file, such as its name, size, and
 * type.
 * @returns The function `csvToJson` returns a Promise that resolves to an array of objects. Each
 * object represents a row in the CSV file, with the keys being the column headers and the values being
 * the corresponding values in each row.
 */
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
