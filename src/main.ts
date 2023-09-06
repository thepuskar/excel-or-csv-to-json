import { toastContainer } from "./toastContainer";
import { handleFileSelect, onClickCopyBtn } from "./utils/handleFileSelect";

import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div class="d-flex justify-content-center align-items-center flex-column" id="main-container">
      <h1 class="fs-4">Excel/CSV to JSON</h1>
      <div class="input-card">
        <div class="col">
          <label for="fileInput" class="form-label">Choose File</label>
          <input
            class="form-control"
            type="file"
            id="fileInput"
            accept=".xlsx, .csv"
          />
        </div>
      </div>
      <button type="button" id="copy-btn" class="btn btn-secondary my-4 d-none">
        Copy JSON to clipboard
      </button>
      <div id="json-viewer" class="col-8 mb-4"></div>
      </div>
      ${toastContainer()}
`;

let fileInput = document.getElementById("fileInput")!;
fileInput.addEventListener("change", (event) => {
  handleFileSelect(event);
});
onClickCopyBtn(document.querySelector<HTMLButtonElement>("#copy-btn")!);
