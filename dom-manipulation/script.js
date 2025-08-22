let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: 'walk the earth with an aura that matches none.', category: 'Motivation' },
  { text: 'Dont let yesterday crimes define your today ', category: 'Inspiration' },
  { text: "it's not how you fall that matters, it's how how you get back up!", category: 'Perseverance' }
];

const quoteDisplay = document.getElementById("quoteDisplay");
const categoryFilter = document.getElementById("categoryFilter"); // dropdown

// ✅ Show a random quote
function showRandomQuotes() {
  quoteDisplay.innerHTML = "";

  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes Available";
    return;
  }

  // Apply filter before random selection
  const selectedCategory = categoryFilter.value;
  const filteredQuotes =
    selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes found for this category.";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const { text, category } = filteredQuotes[randomIndex];

  const quoteText = document.createElement("p");
  quoteText.textContent = `"${text}"`;

  const quoteCategory = document.createElement("small");
  quoteCategory.textContent = `- ${category}`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}

const randomBtn = document.getElementById("newQuote");
randomBtn.addEventListener("click", showRandomQuotes);

// ✅ Add new quote
function addQuote() {
  const newTextInput = document.getElementById("newQuoteText");
  const newCategoryInput = document.getElementById("newQuoteCategory");

  const textInput = newTextInput.value.trim();
  const categoryInput = newCategoryInput.value.trim();

  if (!textInput || !categoryInput) {
    alert("Both Fields must be filled");
    return;
  }

  const newQuote = { text: textInput, category: categoryInput };
  quotes.push(newQuote);

  localStorage.setItem("quotes", JSON.stringify(quotes));

  // Refresh categories in dropdown
  populateCategories();

  // Show the newly added quote
  quoteDisplay.innerHTML = "";
  const quoteText = document.createElement("p");
  quoteText.textContent = `"${newQuote.text}"`;

  const quoteCategory = document.createElement("small");
  quoteCategory.textContent = `- ${newQuote.category}`;

  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);

  newTextInput.value = "";
  newCategoryInput.value = "";
  newTextInput.focus();
}

// ✅ Populate category dropdown dynamically
function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];

  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore saved filter
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
  }
}

// ✅ Handle filter change
function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);
  showRandomQuotes();
}

// ✅ On page load
document.addEventListener("DOMContentLoaded", () => {
  populateCategories();
  showRandomQuotes();
});

// ✅ Export quotes as JSON
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "quotes.json";
  link.click();
  URL.revokeObjectURL(url);
  console.log(url);
}

// ✅ Import from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    const importedQuotes = JSON.parse(event.target.result);
    quotes.push(...importedQuotes);
    localStorage.setItem("quotes", JSON.stringify(quotes));
    populateCategories();
    showRandomQuotes();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}
