import * as bootstrap from "bootstrap";

/**
 * The `toastMsg` function displays a toast message with a given message and type.
 * @param {string} message - The `message` parameter is a string that represents the content of the
 * toast message that will be displayed.
 * @param [type=primary] - The "type" parameter is optional and it specifies the type of toast message.
 * The default value is "primary".
 */
export function toastMsg(message: string, type = "primary") {
  const element = document.querySelector<HTMLDivElement>("#popupToast")!;
  element.classList.add("bg-" + type);
  const toastMsgContainer = document.getElementById("toast-msg");
  toastMsgContainer!.innerHTML = message;
  const toast = new bootstrap.Toast(element, { delay: 3000 });
  toast.show();
}
