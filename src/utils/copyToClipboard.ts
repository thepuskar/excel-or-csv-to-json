import { toastMsg } from ".";

/**
 * The `copyToClipboard` function takes in a string or an array of data, converts it to JSON format,
 * and attempts to copy it to the clipboard, displaying a success or error message using the `toastMsg`
 * function.
 * @param {string | any[]} jsonData - The `jsonData` parameter is a string or an array of any type. It
 * represents the data that needs to be copied to the clipboard.
 * @returns a Promise.
 */
export function copyToClipboard(jsonData: string | any[]) {
  const text = JSON.stringify(jsonData);
  if (jsonData?.length > 0) {
    return navigator.clipboard.writeText(text).then(
      function () {
        toastMsg("Copying to clipboard was successful!", "success");
      },
      function (_err: Error) {
        toastMsg("Could not copy text: ", "danger");
      }
    );
  }
  return toastMsg("Could not copy text", "danger");
}
