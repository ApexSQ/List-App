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
            console.log(list);
          const newTaskCard = document.createElement("div");
          newTaskCard.classList.add("col-md-4", "mb-4", "task-card");
          newTaskCard.dataset.id = list.id;

          newTaskCard.innerHTML = `
            <div class="card">
              <div class="card-body">
                <p class="card-text">${list.text}</p>
                <button class="delete-btn btn btn-danger float-right m-1">Delete</button>
                <button class="update-btn btn btn-primary float-right m-1">Update</button>
              </div>
            </div>
          `;


          listsContainer.appendChild(newTaskCard);

        

            // Add the event listener to the delete button
            const deleteButton = newTaskCard.querySelector(".delete-btn");
            deleteButton.addEventListener("click", async () => {
                
                deleteItem(list._id);

            });


             //Update button listener & Popup window

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
                 updateItem(list)   
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
    location.reload();


})

async function postHandler() {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: list
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

        const DeleteURL = `http://localhost:3000/lists/${id}`

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

    const updateURL = `http://localhost:3000/lists/${_id}`

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

/*async function updateItem(ItemToUpdated){

    console.log(ItemToUpdated);
    
    const {_id, text} = ItemToUpdated;

    isUpdating = true;

    const updateURL = `http://localhost:3000/lists/${_id}`

    input.value = text;

    NewItem = ItemToUpdated;

    try {

        const option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                text: list
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
*/


