import { copyToClipboard, csvToJson, excelToJson, toastMsg } from ".";

let jsonData: string | any[] = [];

/**
 * The function `handleFileSelect` is an asynchronous function that handles the selection of a file and
 * converts it to JSON format based on the file type (Excel or CSV).
 * @param {Event} event - The `event` parameter is of type `Event` and represents the event that
 * triggered the file selection. In this case, it is most likely a change event on an input element,
 * indicating that a file has been selected.
 * @returns the result of calling the `jsonView` function with the converted data (either from Excel to
 * JSON or from CSV to JSON).
 */
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

/**
 * The `jsonView` function takes in a string or an array of data, and renders it as a JSON viewer on
 * the webpage, with an option to copy the data.
 * @param {string | any[]} data - The `data` parameter can be either a string or an array. It
 * represents the JSON data that you want to display in the JSON viewer.
 */
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

/**
 * The `onClickCopyBtn` function adds a click event listener to a button element and calls the
 * `copyToClipboard` function with a JSON data parameter when the button is clicked.
 * @param {HTMLButtonElement} element - The `element` parameter is of type `HTMLButtonElement`, which
 * represents a button element in the HTML document.
 */
export const onClickCopyBtn = (element: HTMLButtonElement) => {
  element.addEventListener("click", () => {
    copyToClipboard(jsonData);
  });
};
