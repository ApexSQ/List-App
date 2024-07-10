const url = "http://localhost:3000/lists";

async function getLists() {
    try {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, options);
        const lists = await response.json();

        const listsContainer = document.querySelector(".lists-items");

        lists.forEach((list) => {
            const newTaskCard = document.createElement("div");
            newTaskCard.classList.add("col-md-4", "mb-4");

            newTaskCard.innerHTML = `
                <div class="card" style="  border-width: 1px; border-style: solid; border-color: #000; /* Black color */">
                    <div class="card-body">
                        <p class="card-text" >${list.text}</p>
                        <button class="btn btn-danger float-right">Delete</button>
                    </div>
                </div>
            `;

            listsContainer.appendChild(newTaskCard);
        });
    } catch (error) {
        console.log(error);
    }
}

getLists();