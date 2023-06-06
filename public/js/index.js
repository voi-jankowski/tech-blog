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

// Resize the text areas automatically when the text is long
M.textareaAutoResize($("#edit-post-content"));
M.textareaAutoResize($("#create-post-textarea"));

// Restrict comment-modals to only when logged in
$(document).on("click", ".comment-btn", function (event) {
  event.preventDefault();

  if (isLoggedIn) {
    const targetModal = $(this).attr("href");
    $(targetModal).modal();
    $(targetModal).modal("open");
  } else {
    window.location.replace("/?loggedIn=false");
  }
});

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
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the signup form
  const username = $("#create-username").val().trim();
  const email = $("#create-email").val().trim();
  const password = $("#create-password").val().trim();

  if (username === "") {
    $("#create-username-error").text("Please, enter a username!");
  }

  if (email === "") {
    $("#create-email-error").text("Please, enter an email!");
  }

  if (password === "") {
    $("#create-password-error").text("Please, enter a password!");
  }

  // Create an object with the username, email and password
  const signupData = {
    username: username,
    email: email,
    password: password,
  };

  if (username && email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.replace("/dashboard");
    } else {
      if (response.status === 409) {
        window.location.replace("/signup?status=409");
      } else {
        window.location.replace("/signup?status=fail");
      }
    }
  }
};

$("#create-account-submit").on("click", signupFormHandler);

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
      window.location.replace("/dashboard");
    } else {
      window.location.replace("/dashboard/new?status=failed");
    }
  }
};

$("#create-post-submit").on("click", newPostFormHandler);

// Edit post function
const editPostFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = $("#edit-post-title").val().trim();
  const content = $("#edit-post-content").val().trim();
  const post_id = $("#edit-post-id").val();

  if (title === "") {
    $("#edit-title-error").text("Please, enter a title!");
  }

  if (content === "") {
    $("#edit-content-error").text("Please, enter content!");
  }

  // Create an object with the title and content
  const postData = {
    title,
    content,
  };
  console.log(postData);

  if (title && content) {
    // Send a PUT request to the API endpoint
    const response = await fetch(`/api/post/${post_id}`, {
      method: "PUT",
      body: JSON.stringify(postData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.replace("/dashboard");
    } else {
      window.location.replace(`/dashboard/edit/${post_id}?status=failed`);
    }
  }
};

$("#edit-post-submit").on("click", editPostFormHandler);

// Delete post function
const deletePostFormHandler = async (event) => {
  // Get the post ID from the data-post-id attribute
  const post_id = $(event.target).attr("data-post-id");

  // Send a DELETE request to the API endpoint
  const response = await fetch(`/api/post/${post_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    window.location.replace("/dashboard");
  } else {
    window.location.replace(`/dashboard?status=failed`);
  }
};

$(".delete-post-btn").on("click", deletePostFormHandler);

// Create new comment function
const newCommentFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the add-comment form
  const postId = $(this).data("post-id");
  const commentTextarea = $(this)
    .closest(".modal")
    .find(".materialize-textarea");
  const commentText = commentTextarea.val();

  if (commentText === "") {
    const commentError = $(this)
      .closest(".modal")
      .find(".create-comment-error");
    commentError.text("Please, enter a comment!");
  }

  // Create an object with the comment text
  const commentData = {
    comment_text: commentText,
  };

  if (commentText) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/comment/${postId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.replace(`/`);
    } else {
      window.location.replace(`/?status=failed`);
    }
  }
};

$(".create-comment-btn").on("click", newCommentFormHandler);
