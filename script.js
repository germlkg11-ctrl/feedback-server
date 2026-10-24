const feedbackForm = document.querySelector("#feedback-form");
const statusLine = document.querySelector("#status");
function describeResponse(response) {
  if (response.ok) {
    return "OK (" + response.status + ")";
  }

  return "Problem (" + response.status + ")";
}
async function sendFeedback(event) {
  event.preventDefault();

  feedbackForm.classList.remove("sent", "failed");
  feedbackForm.classList.add("sending");
  statusLine.textContent = "Sending your feedback...";

  try {
    const response = await fetch(feedbackForm.action, {
      method: "POST",
      body: new URLSearchParams(new FormData(feedbackForm))
    });

    const message = await response.text();

feedbackForm.classList.remove("sending");

if (!response.ok) {
  feedbackForm.classList.add("failed");
  statusLine.textContent = message;
  return;
}

feedbackForm.classList.add("sent");
statusLine.textContent = describeResponse(response) + ": " + message;
  } catch (error) {
    feedbackForm.classList.remove("sending");
    feedbackForm.classList.add("failed");
    statusLine.textContent =
      "Something went wrong. Please try again.";
  }
}

feedbackForm.addEventListener("submit", sendFeedback);