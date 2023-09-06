import { toastMsg } from "../toastMsg";

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
