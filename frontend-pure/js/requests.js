
    // Define state variables
    let apiResponse = null;
    let apiHeaders = null;
    let apiUrl = 'https://jsonplaceholder.typicode.com/users/1';

    // Function to fetch data
    async function fetchData() {
        fetch(apiUrl).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            response.json().then(data => {
                apiResponse = data;
                apiHeaders = response.headers;
                updateUI();
            }).catch(error => {
                console.error('Error fetching data', error);
                apiResponse = error;
                apiHeaders = null;
                updateUI();
            });
        }).catch(error => {
            console.error('Error fetching data', error);
            apiResponse = error.toString();
            apiHeaders = null;
            updateUI();
        });
    }

    // Function to update UI
    function updateUI() {
      document.getElementById('response-data').innerText = apiResponse ? JSON.stringify(apiResponse, null, 2) : '';
      document.getElementById('response-headers').innerText = apiHeaders ? JSON.stringify([...apiHeaders], null, 2) : '';
    }

    // Event listener for form submission
    document.getElementById('api-url-form').addEventListener('submit', function (event) {
      event.preventDefault();
      apiUrl = document.getElementById('api-url-input').value;
      fetchData();
    });

    // Event listener for fetch button click
    document.getElementById('fetch-button').addEventListener('click', function () {
      apiUrl = document.getElementById('api-url-input').value;
      fetchData();
    });

    // Initial fetch on page load
    window.onload = function () {
      fetchData();
      document.getElementById('api-url-input').value = apiUrl;
    };