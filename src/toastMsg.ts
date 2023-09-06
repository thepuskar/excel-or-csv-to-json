import * as bootstrap from "bootstrap";

export function toastMsg(message: string, type = "primary") {
  const element = document.querySelector<HTMLDivElement>("#popupToast")!;
  element.classList.add("bg-" + type);
  const toastMsgContainer = document.getElementById("toast-msg");
  toastMsgContainer!.innerHTML = message;
  const toast = new bootstrap.Toast(element, { delay: 3000 });
  toast.show();
}
