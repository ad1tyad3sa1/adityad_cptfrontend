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
    
    fetch(url, options)
    .then(response => response.json()) 
    .then(data => {
        
        let currentItems = '';
        let currentPoints = 0; 
        const uid = localStorageData.getItem('uid'); 
        
        for (const row of data) {
            if (row.uid == uid) {
                currentItems = row.items; 
                currentPoints = parseInt(row.points); 
                break; 
            }
        }
        console.log(localStorageData.getItem("bakedgood")); 
        let list = [];
        try {
            
            list = JSON.parse(currentItems);
            if (!Array.isArray(list)) {
                throw new Error('Parsed data is not an array'); 
            }
        } catch (error) {
            console.error('Error parsing currentItems:', error.message); 
        }
        list.push(localStorageData.getItem("bakedgood")); 
        currentItems = JSON.stringify(list); 
        var points = currentPoints + parseInt(localStorageData.getItem("points")); 
        console.log(typeof points); 
        console.log(currentItems); 
        
        const body = {
            uid: uid, 
            points: points, 
            items: currentItems 
        };
        const authoptions = {
            method: 'PUT', 
            mode: 'cors', 
            cache: 'default', 
            credentials: 'include', 
            body: JSON.stringify(body), 
            headers: {
                'Content-Type': 'application/json', 
            }
        };
        fetch(url, authoptions); 
    })
    .catch(error => {
        
        console.error('Error fetching user data:', error); 
    });
}


success(url, options, localStorage);
