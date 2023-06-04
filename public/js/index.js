// Initialize dropdown menu
$(".dropdown-trigger").dropdown();

// Initialize collapsible
$(document).ready(function () {
  $(".collapsible").collapsible();
});

// Initialize fixed-action-btn
$(".fixed-action-btn").floatingActionButton({
  toolbarEnabled: true,
});

// Reinitialize all Materialize labels on the page if you are dynamically adding inputs:
$(document).ready(function () {
  M.updateTextFields();
});

// Prefill the textarea field

$("#textarea1").val(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
);
M.textareaAutoResize($("#textarea1"));
M.textareaAutoResize($("#create-post-textarea"));

// Initialize modal
$(document).ready(function () {
  $(".modal").modal();
});
