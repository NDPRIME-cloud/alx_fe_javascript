let quotes =[
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



}
