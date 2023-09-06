import * as XLSX from "xlsx";

/**
 * The function `excelToJson` takes a File object representing an Excel file, reads its contents, and
 * converts it into an array of JSON objects.
 * @param {File} file - The `file` parameter is of type `File` and represents the Excel file that needs
 * to be converted to JSON.
 * @returns The function `excelToJson` returns a Promise that resolves to an array of objects.
 */
export function excelToJson(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const data = event.target!.result;
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      resolve(sheetData);
    };

    reader.onerror = function (event) {
      reject(event.target?.error);
    };

    reader.readAsArrayBuffer(file);
  });
}
