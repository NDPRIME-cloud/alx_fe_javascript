let quotes = JSON.parse(localStorage.getItem("quotes")) || [
    {text: 'walk the earth with an aura that matches none.', category:'Motivation'},
    {text: 'Dont let yesterday crimes define your today ', category: 'Inspiration'},
    {text:"it's not how you fall that matters, it's how how you get back up!", category:'Perseverance'}
]


function showRandomQuotes (){
    const container = document.getElementById("quoteDisplay");
    container.innerHTML= "";

    if (quotes.length === 0){
        container.textContent = "No quotes Available";
        return;
    }

    const randomQuotes = Math.floor(Math.random()*quotes.length);
    const { text, category } = quotes[randomQuotes];

    // creating elements
    const quoteText = document.createElement("p")
    quoteText.textContent = `"${text}"`


    const quoteCategory = document.createElement("small")
    quoteCategory.textContent =`-${category}`

    container.appendChild(quoteText);
    container.appendChild(quoteCategory);



}
const randomBtn = document.getElementById("newQuote")
randomBtn.addEventListener("click", showRandomQuotes)

// createAddQuoteForm()


function addQuote(){
    const newTextInput = document.getElementById("newQuoteText")
    const newCategoryInput = document.getElementById("newQuoteCategory")
    

    const textInput = newTextInput.value.trim()
    const categoryInput = newCategoryInput.value.trim()

    if(!textInput || !categoryInput){
        alert("Both Fields must be filled");
        return;
    }

    const newQuotes = { text: textInput, category: categoryInput }


    quotes.push(newQuotes)


    localStorage.setItem("quotes", JSON.stringify(quotes))

    const container = document.getElementById("quoteDisplay");
    container.innerHTML= "";


     // updating DOM elements
    const quoteText = document.createElement("p")
    quoteText.textContent = `"${newQuotes.text}"`


    const quoteCategory = document.createElement("small")
    quoteCategory.textContent =`-${newQuotes.category}`

    container.appendChild(quoteText);
    container.appendChild(quoteCategory);

    newTextInput.value = "";
    newCategoryInput.value = "";

    newTextInput.focus()



}
document.addEventListener("DOMContentLoaded", ()=>{
    if (quotes.length > 0){
        showRandomQuotes();
    }
})


// --- Existing code (keep everything you already have) ---

// Function to export quotes as JSON file
function exportQuotes() {
    // Convert array to pretty JSON string
    const dataStr = JSON.stringify(quotes, null, 2);

    // Create a Blob with the JSON data
    const blob = new Blob([dataStr], { type: "application/json" });

    // Create a temporary download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quotes.json"; // filename

    // Trigger the download
    link.click();

    // Clean up the URL object
    URL.revokeObjectURL(url);
    console.log(url)
}




function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }