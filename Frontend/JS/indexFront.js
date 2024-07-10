const url = "http://localhost:3000/lists";

document.addEventListener('DOMContentLoaded', async () => {
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
            newTaskCard.classList.add("col-md-4", "mb-4", "task-card");

            newTaskCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <p class="card-text">${list.text}</p>
                        <button class="btn btn-danger float-right m-1 ">Delete</button>
                        <button class="btn btn-primary float-right m-1" >Update</button>
                    </div>
                </div>
            `;

            listsContainer.appendChild(newTaskCard);
        });
    } catch (error) {
        console.log(error);
    }
});