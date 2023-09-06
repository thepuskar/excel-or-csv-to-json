import * as XLSX from "xlsx";

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
