const url = "https://list-app-backend.vercel.app/lists";

// Wait for the DOM to load before executing the code
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Set up the options for the fetch request
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    // Make the fetch request to the specified URL
    const response = await fetch(url, options);
    const lists = await response.json();

    // Get the container element where the task cards will be added
    const listsContainer = document.querySelector(".lists-items");

    // Loop through the retrieved lists and create a task card for each
    lists.forEach((list) => {
      // Create a new task card element
      const newTaskCard = document.createElement("div");
      newTaskCard.classList.add("col-md-4", "mb-4", "task-card");
      newTaskCard.dataset.id = list.id;

      // Store the initial status of the task
      let previousStatus = list.status;
      let StatusColour;

      // Determine the color of the status button based on the task status
      if (list.status === "InProgress") {
        StatusColour = "btn-warning";
      } else if (list.status === "Incomplete") {
        StatusColour = "btn-outline-danger";
      } else {
        StatusColour = "btn-success";
      }

      // Populate the task card with the task details and buttons
      newTaskCard.innerHTML = `
        <div class="card shadow-lg" style="">
          <div class="card-body" >
            <p class="card-text text-center">
              <p class="font-weight-bold m-0 p-0">TASK:</p> ${list.text}
            </p>
            <div class="d-flex flex-column align-items-center">
              <div class="d-flex flex-row flex-md-row justify-content-center mb-2">
                <button class="delete-btn btn btn-danger m-1">Delete</button>
                <button class="update-btn btn btn-primary m-1">Update</button>
              </div>
              <div class="dropdown w-100 m-1 m-md-0">
                <button class="btn dropdown-toggle ${StatusColour} w-100" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopw="true" aria-expanded="false">
                  ${list.status}
                </button>
                <div class="dropdown-menu text-center w-100" aria-labelledby="dropdownMenuButton">
                  <button type="button" class="Incomplete-btn btn btn-outline-danger m-1 w-100">Incomplete</button>
                  <button type="button" class="Inprogress-btn btn btn-warning m-1 w-100">Inprogress</button>
                  <button type="button" class="Completed-btn btn btn-success m-1 w-100">Completed</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      // Add the task card to the container
      listsContainer.appendChild(newTaskCard);

      // Add event listeners to the status update buttons
      const completeButton = newTaskCard.querySelector(".Completed-btn");
      completeButton.addEventListener("click", async () => {
        StatusUpdater(list._id, "Completed");
      });

      const incompleteButton = newTaskCard.querySelector(".Incomplete-btn");
      incompleteButton.addEventListener("click", async () => {
        StatusUpdater(list._id, "Incomplete");
      });

      const InprogressButton = newTaskCard.querySelector(".Inprogress-btn");
      InprogressButton.addEventListener("click", async () => {
        StatusUpdater(list._id, "InProgress");
      });

      // Add event listener to the delete button
      const deleteButton = newTaskCard.querySelector(".delete-btn");
      deleteButton.addEventListener("click", async () => {
        deleteItem(list._id);
      });

      // Add event listener to the update button
      const UpdateButton = newTaskCard.querySelector(".update-btn");
      UpdateButton.addEventListener("click", async () => {
        showPopup();
      });

      // Function to show the update popup
      function showPopup() {
        const popup = document.getElementById("myPopup");
        popup.style.display = "block";

        const submitButton = document.getElementById("submitUpdate");
        submitButton.addEventListener("click", async () => {
          updateItem(list);
          closePopup();
        });

        const closeButton = document.getElementById("closePopup");
        closeButton.addEventListener("click", () => {
          closePopup();
        });
      }

      // Function to close the update popup
      function closePopup() {
        const popup = document.getElementById("myPopup");
        popup.style.display = "none";
      }
    });
  } catch (error) {
    console.log(error);
  }
});



//add button

let list = '';

const input = document.querySelector(".new-task");
input.addEventListener("input", function(event) { 
    list = event.target.value;
})

const inputPopUp = document.querySelector(".Update-task");
inputPopUp.addEventListener("inputPopUp", function(event) { 
    list = event.target.value;
})

const addButton = document.querySelector(".submit-btn");
addButton.addEventListener("click", async function(event){
    event.preventDefault(); 
    await postHandler();

});


// Handles the POST request to the backend server
async function postHandler() {
  try {
      // Define the request options
      const options = {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              text: list, // Assuming 'list' is a variable containing the task text
              status: "Incomplete" // Set the initial status to 'Incomplete'
          })
      }

      // Send the POST request to the backend server
      const response = await fetch(url, options);

      // Check the response status
      if(response.ok) {
          console.log("Task added successfully");
          location.reload(); // Refresh the page to update the UI
      } else {
          // Handle the error
          const errorData = await response.json();
          console.log("Error adding task:", errorData);
      }
  } catch (error) {
      // Handle any unexpected errors
      console.log("Error:", error);
  }
}

// Handles the DELETE request to the backend server
async function deleteItem(id) {
  console.log("Deleting item with ID:", id);

  const deleteURL = `https://list-app-backend.vercel.app/lists/${id}`;

  try {
      // Define the request options
      const options = {
          method: "DELETE",
      }

      // Send the DELETE request to the backend server
      const itemToBeDeleted = await fetch(deleteURL, options);

      if(itemToBeDeleted.ok){
          console.log("Item deleted successfully");
          location.reload(); // Refresh the page to update the UI
      } else {
          console.log("Failed to delete the item");
      }
  } catch (error) {
      // Handle any unexpected errors
      console.log("Error:", error);
  }
}

// Handles the UPDATE request to the backend server
async function updateItem(itemToUpdate){
  console.log("Updating item:", itemToUpdate);
  
  const {_id, text} = itemToUpdate;

  isUpdating = true;

  const updateURL = `https://list-app-backend.vercel.app/lists/${_id}`;

  console.log("New text:", inputPopUp.value);

  try {
      // Define the request options
      const options = {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              text: inputPopUp.value // Use the updated text from the input field
          })
      }
      
      // Send the PUT request to the backend server
      const response = await fetch(updateURL, options);

      if (response.ok) {
          location.reload(); // Refresh the page to update the UI
          console.log("Item updated successfully");
      } else {
          console.log("Failed to update the item");
      }
  } catch (error) {
      // Handle any unexpected errors
      console.log("Error:", error);
  }
}

// Handles the status update request to the backend server
async function StatusUpdater(taskId, newStatus) {
  console.log("Updating task status:", taskId, newStatus);

  const updateURL = `https://list-app-backend.vercel.app/lists/${taskId}`;

  try {
      // Define the request options
      const options = {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              status: newStatus // Update the status with the new value
          })
      };

      // Send the PUT request to the backend server
      const response = await fetch(updateURL, options);

      if (response.ok) {
          const updatedTask = await response.json();
          console.log("Task status updated successfully:", updatedTask);
          location.reload(); // Refresh the page to update the UI
      } else {
          console.error("Error updating task status:", response.status);
      }
  } catch (error) {
      // Handle any unexpected errors
      console.error("Error updating task status:", error);
  }
}