export const toastContainer = () => {
  return `
    <div class="position-fixed top-0 end-0 p-3" style="z-index: 11">
      <div
        id="popupToast"
        class="toast align-items-center text-white border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div id="toast-msg" class="toast-body"></div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  `;
};
