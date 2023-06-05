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
// M.textareaAutoResize($("#textarea1"));
// M.textareaAutoResize($("#create-post-textarea"));

// Initialize modal
$(document).ready(function () {
  $(".modal").modal();
  // Check if URL contains loggedIn=false query parameter
  const url = window.location.href;
  if (url.includes("loggedIn=false")) {
    // If so, open the login modal
    $("#login-modal").modal("open");
  }
  // Check if URL contains status=400 query parameter, if so display message from query parameter
  if (url.includes("status=400")) {
    // If so, display an alert
    $("#login-modal").modal("open");
    $("#status400alert").text(
      "Incorrect username or password, please try again."
    );
  }
});

// Sign up function

// Login function
const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const usernameLogin = $("#login-username").val().trim();
  const passwordLogin = $("#login-password").val().trim();

  if (usernameLogin === "") {
    $("#login-username-error").text("Please, enter your email!");
  }

  if (passwordLogin === "") {
    $("#login-password-error").text("Please, enter your password!");
  }

  // Create an object with the email and password
  const loginData = {
    username: usernameLogin,
    password: passwordLogin,
  };

  if (usernameLogin && passwordLogin) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("logged in");
      window.location.replace("/dashboard");
    } else {
      if (response.status === 400) {
        window.location.replace("/?status=400");
      } else {
        console.log("failed to log in");
        console.log(response);
      }
    }
  }
};

$("#login-submit").on("click", loginFormHandler);

// Create new post function
const newPostFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = $("#create-post-title").val().trim();
  const content = $("#create-post-content").val().trim();

  if (title === "") {
    $("#create-title-error").text("Please, enter a title!");
  }

  if (content === "") {
    $("#create-content-error").text("Please, enter content!");
  }

  // Create an object with the email and password
  const postData = {
    title,
    content,
  };
  console.log(postData);

  if (title && content) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log("post created");
      window.location.replace("/dashboard");
    } else {
      console.log("failed to create post");
      console.log(response);
      window.location.replace("/dashboard/new?status=400");
    }
  }
};
