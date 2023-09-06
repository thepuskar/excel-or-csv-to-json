import { toastMsg } from "../toastMsg";
import { copyToClipboard } from "./copyToClipboard";
import { csvToJson } from "./csvToJson";
import { excelToJson } from "./excelToJson";

var jsonData: string | any[] = [];

export async function handleFileSelect(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  const file = inputElement.files?.[0];

  if (file) {
    const fileName = file.name.toLowerCase();

    if (fileName.endsWith(".xlsx")) {
      const excelToJsonData = await excelToJson(file);
      jsonData = excelToJsonData;
      return jsonView(excelToJsonData);
    }
    if (fileName.endsWith(".csv")) {
      const csvToJsonData = await csvToJson(file);
      jsonData = csvToJsonData;
      return jsonView(csvToJsonData);
    }
    return toastMsg("Unknown file", "danger");
  }
}

const jsonView = (data: string | any[]) => {
  let copyBtn = document.querySelector<HTMLButtonElement>("#copy-btn")!;
  if (data?.length > 0) {
    copyBtn!.classList.remove("d-none");
    copyBtn!.classList.add("d-block");
  }
  // @ts-ignore: Disable "Cannot find name 'JsonViewer'" error
  const viewer = new JsonViewer({
    value: data,
    theme: "dark",
  });
  viewer.render("#json-viewer");
};

export const onClickCopyBtn = (element: HTMLButtonElement) => {
  element.addEventListener("click", () => {
    copyToClipboard(jsonData);
  });
};
