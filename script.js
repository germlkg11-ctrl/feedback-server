
const feedbackForm = document.querySelector("#feedback-form");
const statusLine = document.querySelector("#status");
const feedbackBody = document.querySelector("#feedback-body");

// Describe the server's response.
function describeResponse(response) {
  if (response.ok) {
    return "OK (" + response.status + ")";
  }

  return "Problem (" + response.status + ")";
}

// Submit feedback from the feedback form page.
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
    statusLine.textContent =
      describeResponse(response) + ": " + message;
  } catch (error) {
    feedbackForm.classList.remove("sending");
    feedbackForm.classList.add("failed");

    statusLine.textContent =
      "Something went wrong. Please try again.";
  }
}

// Build one table row for one feedback entry.
function makeFeedbackRow(entry) {
  const row = document.createElement("tr");

  const whenCell = document.createElement("th");
  whenCell.scope = "row";
  whenCell.textContent = entry.when;

  const ratingCell = document.createElement("td");
  ratingCell.textContent = entry.rating;

  const commentCell = document.createElement("td");
  commentCell.textContent = entry.comment || "";

  row.append(whenCell, ratingCell, commentCell);

  return row;
}

// Load saved feedback into the table on list.html.
async function loadFeedback() {
  try {
    const response = await fetch("/feedback.json");

    if (!response.ok) {
      throw new Error("Could not load feedback.");
    }

    const entries = await response.json();

    for (let i = 0; i < entries.length; i++) {
      feedbackBody.append(makeFeedbackRow(entries[i]));
    }
  } catch (error) {
    console.error("Unable to load feedback:", error);
  }
}

// Run only the code that belongs to the current page.
if (feedbackForm) {
  feedbackForm.addEventListener("submit", sendFeedback);
}

if (feedbackBody) {
  loadFeedback();
}
