document.addEventListener("DOMContentLoaded", () => {
  loadMoodHistory();

  const allMoodOptions = document.getElementById("moodChoices");
  const submitBtn = document.getElementById("submitBtn");
  const todayDate = document.getElementById("todayDate");
  const toggleBtn = document.getElementById("toggleSidebar");
  const sidebar = document.getElementById("sidebar");

  function loadMoodHistory() {
    const moodHistoryList = document.getElementById("moodHistory");
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    moodHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    moodHistoryList.innerHTML = "";
    moodHistory.forEach((entry) => {
      let listItem = document.createElement("li");
      listItem.textContent = `${entry.mood} - ${entry.date}`;
      moodHistoryList.appendChild(listItem);
    });
  }

  function addMoodToHistory(mood) {
    const moodHistoryList = document.getElementById("moodHistory");
    let moodHistory = JSON.parse(localStorage.getItem("moodHistory")) || [];
    const today = new Date().toLocaleDateString();
    if (moodHistory.some((entry) => entry.date === today)) {
      alert("You already submitted a mood today!");
      return;
    }
    moodHistory.unshift({ mood, date: today });
    localStorage.setItem("moodHistory", JSON.stringify(moodHistory));
    loadMoodHistory();
  }

  const date = new Date();
  todayDate.innerText = ` ${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  let moodSelected = false;
  let selectedMoodElement = null;
  let selectedMoodText = "";

  allMoodOptions.addEventListener("click", (e) => {
    if (moodSelected)
      return alert("You have already selected a mood for today!");
    const selectedMood = e.target.closest(".mood");
    if (!selectedMood) return;
    if (selectedMoodElement)
      selectedMoodElement.classList.remove("selectedMood");
    selectedMoodText = selectedMood.querySelector("p").textContent;
    selectedMoodElement = selectedMood;
    selectedMoodElement.classList.add("selectedMood");
  });

  submitBtn.addEventListener("click", () => {
    if (moodSelected) return alert("You already submitted a mood today!");
    if (!selectedMoodText) return alert("Please select a mood first!");
    addMoodToHistory(selectedMoodText);
    moodSelected = true;
    if (selectedMoodElement)
      selectedMoodElement.classList.remove("selectedMood");
    alert(`${selectedMoodText} Submitted successfully`);
  });

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    toggleBtn.innerHTML = sidebar.classList.contains("active")
      ? "&rarr; Track History"
      : "&larr; Track History";
  });
});
