const url = "https://list-app-backend.vercel.app/lists";

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
      console.log(list);
      const newTaskCard = document.createElement("div");
      newTaskCard.classList.add("col-md-4", "mb-4", "task-card");
      newTaskCard.dataset.id = list.id;

      let previousStatus = list.status; // Store the initial status
      let StatusColour;

      if (list.status === "InProgress") {
        StatusColour = "btn-warning";
      } else if (list.status === "Incomplete") {
        StatusColour = "btn-outline-danger";
      } else {
        StatusColour = "btn-success";
      }
      
      newTaskCard.innerHTML = `
        <div class="card">
          <div class="card-body">
            <p class="card-text text-center">${list.text}</p>
            <button class="delete-btn btn btn-danger float-right m-1">Delete</button>
            <button class="update-btn btn btn-primary float-right m-1">Update</button>
            <div class="dropdown float-right m-1">
              <button class="btn dropdown-toggle ${StatusColour}" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopow="true" aria-expanded="false">
                ${list.status}
              </button>
              <div class="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                <button type="button" class="Incomplete-btn btn btn-outline-danger m-1">Incomplete</button>
                <button type="button" class="Inprogress-btn btn btn-warning m-1">Inprogress</button>
                <button type="button" class="Completed-btn btn btn-success m-1">Completed</button>
              </div>
            </div>
          </div>
        </div>
      `;

      listsContainer.appendChild(newTaskCard);

            // Event listener for Completed button click
            const completeButton = newTaskCard.querySelector(".Completed-btn");
            completeButton.addEventListener("click", async () => {
              console.log("completeButton Clicked");
              console.log(list._id);
              StatusUpdater(list._id, "Completed");
              location.reload();
            });

      // Event listener for Incomplete button click
      const incompleteButton = newTaskCard.querySelector(".Incomplete-btn");
      incompleteButton.addEventListener("click", async () => {
        console.log("incompleteButton Clicked");
        console.log(list._id);
        StatusUpdater(list._id, "Incomplete");
        location.reload();
      });

      // Event listener for InProgress button click
      const InprogressButton = newTaskCard.querySelector(".Inprogress-btn");
      InprogressButton.addEventListener("click", async () => {
        console.log("InProgress Clicked");
        console.log(list._id);
        StatusUpdater(list._id, "InProgress");
        location.reload();
      });

      // Add the event listener to the delete button
      const deleteButton = newTaskCard.querySelector(".delete-btn");
      deleteButton.addEventListener("click", async () => {
        deleteItem(list._id);
      });

      // Update button listener & Popup window
      const UpdateButton = newTaskCard.querySelector(".update-btn");
      UpdateButton.addEventListener("click", async () => {
        console.log("Update Button Clicked");
        showPopup();
      });

      function showPopup() {
        const popup = document.getElementById("myPopup");
        popup.style.display = "block";

        const submitButton = document.getElementById("submitUpdate");
        submitButton.addEventListener("click", async () => {
          updateItem(list);
          closePopup();
          location.reload();
        });

        const closeButton = document.getElementById("closePopup");
        closeButton.addEventListener("click", () => {
          closePopup();
        });
      }

      function closePopup() {
        const popup = document.getElementById("myPopup");
        popup.style.display = "none";
      }
    });
  } catch (error) {
    console.log(error);
  }
});



//PUT add button

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
addButton.addEventListener("click", function(){
    postHandler();
    //location.reload();



    
})


async function postHandler() {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: list,
                status: "Incomplete"
            })
        }

        const response = await fetch(url, options);

        if(response.ok) {
            console.log("VERY SEC");
        } else {
            const errorData = await response.json();
            console.log("VERY NOT SEC");
            console.log("Error:", errorData);
        }
    } catch (error) {
        console.log("Error:", error);
    }
}

    // Delete request

    async function deleteItem(id) {
        console.log(id);

        const DeleteURL = `https://list-app-backend.vercel.app/lists/${id}`

        console.log(DeleteURL);

        try {

            const option = {
                method: "DELETE",
            }

            const ItemToBeDeleted = await fetch(DeleteURL, option);

            if(ItemToBeDeleted.ok){
                console.log("Item Deleted ")
                location.reload();
            }else {
                console.log("delete Failed")
            }
            
        } catch (error) {
            console.log("Error:", error);
        }

    }



//UPDATE FUNCTION    

async function updateItem(ItemToUpdated){

    console.log(ItemToUpdated);
    
    const {_id, text} = ItemToUpdated;

    isUpdating = true;

    const updateURL = `https://list-app-backend.vercel.app/lists/${_id}`

    //inputPopUp.value = text;

    console.log(inputPopUp.value);

    try {

        const option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: inputPopUp.value
            })
        }
        
        const response = await fetch(updateURL, option);

        if (response.ok) {
            
            console.log("UPDATE WORKING")

        } else {
            console.log(" Failed")
        }


    } catch (error) {
        console.log("Error:", error);
    }


}


//Sratus update


async function StatusUpdater(taskId, newStatus) {
    
    console.log(taskId);
    console.log(newStatus);


    const updateURL = `https://list-app-backend.vercel.app/lists/${taskId}`
  
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus
        })
      };
  
      const response = await fetch(updateURL, options);
  
      if (response.ok) {
        const updatedTask = await response.json();
        console.log("Task status updated successfully:", updatedTask);
      } else {
        console.error("Error updating task status:", response.status);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }
  

