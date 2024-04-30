// Update the header text to congratulate the user on making a specific baked good
var header = document.getElementById("header");
header.textContent = "Congrats! You made a " + localStorage.getItem("bakedgood") + "!";

// Construct the path to the image corresponding to the baked good
var name = "/lmc-frontend/images/" + localStorage.getItem("bakedgood") + ".png";
console.log(name);

// Retrieve the image element and set its properties
var image = document.getElementById("image");
image.style.width = '200px'; // Set width
image.style.height = '200px'; // Set height (fixed the typo)
image.style.objectFit = 'contain'; // Set object-fit property
image.setAttribute("src", name); // Set the image source attribute
console.log(image);

// Set initial points to 0
var points = 0;

// After 6 seconds, remove the hidden class from the Danish image to make it visible
setTimeout(function() {
    document.querySelector('.hidden').classList.remove('hidden');
}, 6000);

// After 9 seconds, redirect to the cook page
setTimeout(function() {
    window.location.href = "/lmc-frontend/cook";
}, 9000);

// Define URL and options for fetching user data
const url = "http://127.0.0.1:8028/api/users/";
const options = {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
};

// Above code written by my teammate 1 

//
function success(url, options, localStorageData) {
    // Fetch data from URL using provided options
    fetch(url, options)
    .then(response => response.json()) // Parse response as JSON
    .then(data => {
        // Handle successful response here
        let currentItems = '';
        let currentPoints = 0; // Initialize currentPoints variable
        const uid = localStorageData.getItem('uid'); // Get user ID from localStorageData
        // Loop through the data to find items belonging to the current user
        for (const row of data) {
            if (row.uid == uid) {
                currentItems = row.items; // Retrieve items for the current user
                currentPoints = parseInt(row.points); // Parse points for the current user
                break; // Exit loop once user data is found
            }
        }
        console.log(localStorageData.getItem("bakedgood")); // Log a specific item
        let list = [];
        try {
            // Parse currentItems as JSON array
            list = JSON.parse(currentItems);
            if (!Array.isArray(list)) {
                throw new Error('Parsed data is not an array'); // Throw error if parsed data is not an array
            }
        } catch (error) {
            console.error('Error parsing currentItems:', error.message); // Log error if parsing fails
        }
        list.push(localStorageData.getItem("bakedgood")); // Add a new item to the list
        currentItems = JSON.stringify(list); // Convert the updated list back to JSON string
        var points = currentPoints + parseInt(localStorageData.getItem("points")); // Calculate total points
        console.log(typeof points); // Log the type of points
        console.log(currentItems); // Log the retrieved items
        // Manipulate and update the items here
        const body = {
            uid: uid, // Get user ID from localStorageData
            points: points, // Update points
            items: currentItems // Update items
        };
        const authoptions = {
            method: 'PUT', // HTTP method for updating data
            mode: 'cors', // Request mode
            cache: 'default', // Cache mode
            credentials: 'include', // Send cookies
            body: JSON.stringify(body), // Convert body to JSON string
            headers: {
                'Content-Type': 'application/json', // Set content type header
            }
        };
        fetch(url, authoptions); // Send updated data to server
    })
    .catch(error => {
        // Handle error
        console.error('Error fetching user data:', error); // Log error if fetching fails
    });
}

// Call the success function with the defined URL, options, and localStorageData
success(url, options, localStorage);
