document.addEventListener('DOMContentLoaded', function() {
    // Set the default tab to display on page load
    openTab('default');
    
    // Add click event listeners to tab buttons
    var tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var tabId = this.getAttribute('data-tab');
            openTab(tabId);
        });
    });

    // Add change event listener to checkboxes for real-time total update
    var checkboxes = document.getElementsByName('selectedNodes');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', updateTotalMemory);
    });
});

function openTab(tabId) {
    var i, tabContent, tabButtons;

    // Hide all tab content
    tabContent = document.querySelectorAll('.tab-content');
    tabContent.forEach(function(content) {
        content.style.display = 'none';
    });

    // Deactivate all tab buttons
    tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(function(button) {
        button.classList.remove('active');
    });

    // Show the selected tab content
    document.getElementById(tabId).style.display = 'block';

    // Activate the clicked tab button
    var activeButton = document.querySelector('[data-tab="' + tabId + '"]');
    // activeButton.classList.add('active');
}


function submitAllForms() {
    // Gather data from each form
    var formDataTab1 = {
        selectedNodes: getSelectedNodesFromTab('nodes')
    };

    var formDataTab2 = {
        hftoken: document.getElementById('hftoken').value,
        hfdataset: document.getElementById('hfdataset').value
    };

    var formDataTab3 = {
        hftoken: document.getElementById('hftoken').value,
        hfmodel: document.getElementById('hfmodel').value
    };

    // Combine all data into a single object
    var allFormData = {
        formDataTab1: formDataTab1,
        formDataTab2: formDataTab2,
        formDataTab3: formDataTab3,
    };

    console.log(allFormData);

    // // Send the combined data to the server
    // fetch('/process_all_forms', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(allFormData),
    // })
    // .then(response => response.json())
    // .then(data => {
    //     alert(data.message); // Display a success message (you can customize this)
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
}

function getSelectedNodesFromTab(tabId) {
    var selectedNodes = [];
    var checkboxes = document.getElementsByName('selectedNodes');

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            selectedNodes.push(checkbox.value);
        }
    });

    return selectedNodes;
}

function updateTotalMemory() {
    var totalMemoryElement = document.getElementById('totalMemory');
    var checkboxes = document.getElementsByName('selectedNodes');
    var totalMemory = 0;

    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            // Extract the GPU memory value from the checkbox's label
            var labelParts = checkbox.nextSibling.nodeValue.trim().split(':');
            var gpuMemory = parseInt(labelParts[labelParts.length - 1].trim());

            // Update the total memory
            totalMemory += gpuMemory;
        }
    });

    totalMemoryElement.textContent = totalMemory;
}