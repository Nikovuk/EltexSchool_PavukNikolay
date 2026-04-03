const statisticsDialog = document.getElementById("statistics_window");
const statisticsDialogOpenButton = document.querySelector(
  ".open_statistics_button",
);
const blogSubmitWindow = document.getElementById("input_blog_window");
const openBlogSubmitWindowButton = document.getElementById(
  "open_blog_submit_button",
);

const closeBlogSubmitButton = document.getElementById(
  "close_blog_submit_button",
);
const addBlogButton = document.getElementById("add_blog_button");
const blogCardsContainer = document.querySelector(".blog_cards_container");
const blogCardTemplate = document.getElementById("blog_card_template");
const statisticsDialogCloser =
  statisticsDialog.querySelector(".closeDialogBtn");
const statisticsTextElements = {
  postsCount: document.getElementById("posts_count"),
  commentsCount: document.getElementById("comments_count"),
};

function closeOnBackDropClick({ currentTarget, target }) {
  const dialog = currentTarget;
  const isClickedOnBackDrop = target === dialog;
  if (isClickedOnBackDrop) {
    close();
  }
}

function addBlogCard() {
  let blogCard = blogCardTemplate.content.cloneNode(true);

  let title = document.getElementById("new_blog_title").value.trim();
  let content = document.getElementById("new_blog_content").value.trim();

  blogCard.querySelector(".blog_card_title").textContent = title;
  blogCard.querySelector(".blog_card_descrition").textContent = content;
  const now = new Date();
  const timeEl = blogCard.querySelector("time");
  timeEl.dateTime = now.toISOString().split("T")[0];
  timeEl.textContent = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  blogCardsContainer.appendChild(blogCard);
  blogSubmitWindow.reset();
  closeBlogSubmit();
}

function openStatisticsAndLockScroll() {
  updateStatisticsText();
  statisticsDialog.showModal();
  document.body.classList.add("scroll-lock");
}

function openBlogSubmit() {
  blogSubmitWindow.classList.add("active");
}

function closeBlogSubmit() {
  blogSubmitWindow.classList.remove("active");
}

function returnScroll() {
  document.body.classList.remove("scroll-lock");
}

function close() {
  statisticsDialog.close();
  returnScroll();
}
function collectStatistics() {
  let postsCount = document.querySelectorAll(".blog_card").length;
  //   let commentsCount = document.querySelectorAll('.comment').length;
  let commentsCount = 0;
  return {
    postsCount,
    commentsCount,
  };
}
function updateStatisticsText() {
  let stats = collectStatistics();
  statisticsTextElements.postsCount.textContent = stats.postsCount;
  statisticsTextElements.commentsCount.textContent = stats.commentsCount;
}

statisticsDialog.addEventListener("click", closeOnBackDropClick);
statisticsDialog.addEventListener("cancel", (eventcloseDialogBtn) => {
  returnScroll();
});

if (openBlogSubmitWindowButton) {
  openBlogSubmitWindowButton.addEventListener("click", openBlogSubmit);
}
if (closeBlogSubmitButton) {
  closeBlogSubmitButton.addEventListener("click", closeBlogSubmit);
}

if (statisticsDialogOpenButton) {
  statisticsDialogOpenButton.addEventListener(
    "click",
    openStatisticsAndLockScroll,
  );
}

statisticsDialogCloser.addEventListener("click", (event) => {
  event.stopPropagation();
  close();
});

document.addEventListener("DOMContentLoaded", () => {
  updateStatisticsText();
  closeBlogSubmit();
});

blogSubmitWindow.addEventListener("submit", (event) => {
  event.preventDefault();
  addBlogCard();
});

blogCardsContainer.addEventListener("click", (event) => {
  const deleteButton = event.target.closest(".delete_blog_button");

  const card = deleteButton.closest(".blog_card");
  if (card) {
    card.remove();
  }
});