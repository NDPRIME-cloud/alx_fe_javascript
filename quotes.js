// document.addEventListener("DOMContentLoaded", () => {
//   const favQuotes = document.getElementById("myQuotes");
//   const nameofAuthor = document.getElementById("Author-quotes");
//   const saveBtn = document.getElementById("save-btn");
//   const quoteList = document.getElementById("storedQuotes");

//   function Add() {
//     let quoteText = favQuotes.value.trim();
//     let authorName = nameofAuthor.value.trim();

//     if (!quoteText || !authorName) {
//       alert("Please fill the fields ");
//       return;
//     }

//     let quotes = quoteList.getElementsByTagName("div");
//     for (let quote of quotes) {
//       let writtingText = quote.querySelector("p").textContent.trim();
//       if (writtingText === quoteText) {
//         alert("already added");
//         return;
//       }
//     }

//     // quoteList.innerHTML = ""
//     const quoteDiv = document.createElement("div");
//     quoteDiv.classList.add("quote-item");
//     quoteDiv.innerHTML = `<p> ${quoteText}.</p> 
//     <small> - ${authorName}</small> <br>
//      <button class="delete-btn">Delete</button>
//      <button class="edit-btn">Edit</button>
//     `;

//     const removeBtn = quoteDiv.querySelector(".delete-btn");
//     removeBtn.addEventListener("click", () => {
//       quoteList.removeChild(quoteDiv);
//     });

//     const editBtn = quoteDiv.querySelector(".edit-btn");
//     editBtn.addEventListener("click", () => {
//       const newQuoteText = prompt("Edit Quote", quoteText);
//       const newAuthorName = prompt("Edit Author's name", authorName);

//       if (newQuoteText && newAuthorName) {
//         quoteText = newQuoteText.trim();
//         authorName = newAuthorName.trim();

//         quoteDiv.querySelector("p").textContent = quoteText;
//         quoteDiv.querySelector("small").textContent = `-${authorName}`;
//       }
//     });

//     quoteList.appendChild(quoteDiv);

//     favQuotes.value = "";
//     nameofAuthor.value = "";
//   }
//   saveBtn.addEventListener("click", Add);
//   nameofAuthor.addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       Add();
//     }
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
    const favQuotes = document.getElementById("myQuotes");
    const nameofAuthor = document.getElementById("Author-quotes");
    const saveBtn = document.getElementById("save-btn");
    const quoteList = document.getElementById("storedQuotes");

    // Load saved quotes from localStorage
    let storedQuotes = JSON.parse(localStorage.getItem("quotes")) || [];
    storedQuotes.forEach(q => renderQuote(q.text, q.author));

    function saveToLocalStorage() {
        let quotesArray = [];
        let quotes = quoteList.getElementsByClassName("quote-item");
        for (let quote of quotes) {
            let text = quote.querySelector("p").textContent.trim();
            let author = quote.querySelector("small").textContent.replace("-", "").trim();
            quotesArray.push({ text, author });
        }
        localStorage.setItem("quotes", JSON.stringify(quotesArray));
    }

    function renderQuote(quoteText, authorName) {
        const quoteDiv = document.createElement('div');
        quoteDiv.classList.add("quote-item");
        quoteDiv.innerHTML = `
            <p>${quoteText}</p> 
            <small>- ${authorName}</small> <br>
            <button class="delete-btn">Delete</button>
            <button class="edit-btn">Edit</button>
        `;

        const removeBtn = quoteDiv.querySelector(".delete-btn");
        removeBtn.addEventListener("click", () => {
            quoteList.removeChild(quoteDiv);
            saveToLocalStorage();
        });

        const editBtn = quoteDiv.querySelector(".edit-btn");
        editBtn.addEventListener("click", () => {
            const newQuoteText = prompt("Edit Quote", quoteText);
            const newAuthorName = prompt("Edit Author's name", authorName);

            if (newQuoteText && newAuthorName) {
                quoteText = newQuoteText.trim();
                authorName = newAuthorName.trim();
                quoteDiv.querySelector("p").textContent = quoteText;
                quoteDiv.querySelector("small").textContent = `- ${authorName}`;
                saveToLocalStorage();
            }
        });

        quoteList.appendChild(quoteDiv);
    }

    function Add() {
        let quoteText = favQuotes.value.trim();
        let authorName = nameofAuthor.value.trim();

        if (!quoteText || !authorName) {
            alert("Please fill the fields");
            return;
        }

        let quotes = quoteList.getElementsByTagName("div");
        for (let quote of quotes) {
            let writtingText = quote.querySelector("p").textContent.trim();
            if (writtingText === quoteText) {
                alert("already added");
                return;
            }
        }

        renderQuote(quoteText, authorName);
        saveToLocalStorage();

        favQuotes.value = "";
        nameofAuthor.value = "";
    }

    saveBtn.addEventListener("click", Add);
    nameofAuthor.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            Add();
        }
    });
});

