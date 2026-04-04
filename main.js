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

let blogsArray = JSON.parse(localStorage.getItem("blogPosts")) || [];

const addBlogButton = document.getElementById("add_blog_button");
const blogCardsContainer = document.querySelector(".blog_cards_container");
const blogCardTemplate = document.getElementById("blog_card_template");
const statisticsDialogCloser =
  statisticsDialog.querySelector(".closeDialogBtn");
const statisticsTextElements = {
  postsCount: document.getElementById("posts_count"),
  commentsCount: document.getElementById("comments_count"),
};
const blogCardsEmpty = document.getElementById("blog_cards_empty");

class BlogPost {
  constructor(title, description) {
    this.description = description;
    this.title = title;
    this.id = Date.now().toString();
    this.date = new Date().toISOString();
  }
}
function newBlogInstance() {
  const title = document.getElementById("new_blog_title").value.trim();
  const content = document.getElementById("new_blog_content").value.trim();

  const newBlog = new BlogPost(title, content);

  blogsArray.push(newBlog);
  saveBlogsToLocalStorage();
  addBlogCard(newBlog);
  console.log(blogsArray)
    blogsEmptyToggle();
  blogSubmitWindow.reset();
  closeBlogSubmit();
}
function blogsEmptyToggle() {
  if (blogsArray.length == 0) {
    blogCardsEmpty.classList.add("active");
  } else {
    blogCardsEmpty.classList.remove("active");
  }
}
function addBlogCard(blog) {
  const blogCardInst = blogCardTemplate.content.cloneNode(true);

  blogCardInst.getElementById("blog_card_id").textContent = blog.id;
  blogCardInst.querySelector(".blog_card_title").textContent = blog.title;
  blogCardInst.querySelector(".blog_card_descrition").textContent = blog.description;

  const timeEl = blogCardInst.querySelector("time");
  timeEl.textContent = new Date(blog.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  blogCardsContainer.appendChild(blogCardInst);
}

function deleteBlogCard(event) {
  const deleteButton = event.target.closest(".delete_blog_button");

  const card = deleteButton.closest(".blog_card");

  const cardId = card.querySelector("#blog_card_id").textContent;
  blogsArray = blogsArray.filter((p) => p.id !== cardId);
  saveBlogsToLocalStorage();
  console.log(blogsArray)
  card.remove();
  blogsEmptyToggle();
}

function saveBlogsToLocalStorage() {
  localStorage.setItem("blogPosts", JSON.stringify(blogsArray));
}

function closeOnBackDropClick({ currentTarget, target }) {
  const dialog = currentTarget;
  const isClickedOnBackDrop = target === dialog;
  if (isClickedOnBackDrop) {
    close();
  }
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
  blogSubmitWindow.reset();
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
  blogsEmptyToggle();
  blogsArray.forEach(post => addBlogCard(post));
});

blogSubmitWindow.addEventListener("submit", (event) => {
  event.preventDefault();
  newBlogInstance();
});
blogCardsContainer.addEventListener("click", (event) => {
  deleteBlogCard(event);
});
