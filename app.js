const dropdown = document.getElementById('dropdown');
const alarmBell = document.querySelector('.alarm-btn');
const menu = document.getElementById('menu-list');
const menuBtn = document.querySelector('.store-menu');
const deleteButtons = document.querySelectorAll('.delete-btn, .delete-mobile-btn')
const guideList = document.querySelector('.guide-list');
const closeArrow = document.getElementById('close');
const openArrow = document.getElementById('open');

// function to toggle the visibility of the notification dropdown
function notificationsToggle() {
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    console.log('bell clicked')
}

// this closes the dropdown menu when clicked outside
document.addEventListener('click', function(event) {
    if (!alarmBell.contains(event.target) & !dropdown.contains(event.target)) {
        dropdown.style.display = 'none';
    }
});

// function that shows a list of menu items
function menuList() {
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    console.log('menu clicked');
}

// to close the menu when the button is clicked again
document.addEventListener('click', function(e) {
    if (!menuBtn.contains(e.target) & !menuBtn.contains(e.target)) {
        menu.style.display = 'none';
    }
})

// function to handle the delete button when clicked
function handleDeleteButton(event) {
    const parentDiv = event.target.closest('.plan');
    if (parentDiv) {
        parentDiv.remove();
    }
}

deleteButtons.forEach(button => {
    button.addEventListener('click', handleDeleteButton);
})

// function to handle closing and opening of setup cards
function card() {
    if (guideList.style.display === 'none') {
        guideList.style.display = 'block';
        openArrow.style.display = 'none';
        closeArrow.style.display = 'block';
    } else {
        guideList.style.display = 'none';
        openArrow.style.display = 'block';
        closeArrow.style.display = 'none';
    }
}


const steps = document.querySelectorAll('#steps .list');
const progressText = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');

let completedSteps = 0;

// Update progress bar and count completed steps
function updateProgress() {
    completedSteps = document.querySelectorAll('#steps li.completed').length;
    const percentage = (completedSteps / steps.length) * 100;
    progressBar.style.width = `${percentage}%`
    progressText.textContent = `${completedSteps} / ${steps.length} completed`
}

// function to toggle completed status
function toggleCompleted(event) {
    const listItem = event.currentTarget;
    const listContent = listItem.querySelector('.list-content');

    if (!listItem.classList.contains('completed')) {
        listContent.classList.add('show');
        listItem.classList.remove('list-active');
    } else {
        listContent.classList.remove('show');
        listItem.classList.add('list-active');
    }

    listItem.classList.toggle('completed');
    updateProgress();
}

// function to toggle list content visibility
function toggleListContent(event) {
    const listContent = event.currentTarget.querySelector('.list-content');

    // and listeners for keyboard users to toggle the visibility of the list content
    if ((event.type === 'click') || (event.key === 'Enter' || event.keyCode === 13)) {
        // Close previously opened list content
        document.querySelectorAll('.list-content').forEach(content => {
          if (content !== listContent) {
            content.classList.remove('show');
          }
        });
    
        // Toggle visibility of clicked list content
        listContent.classList.toggle('show');
      }
    
}

let previousListItem = null;
// Add event listeners
steps.forEach(step => {
    step.addEventListener('click', event => {
        if (event.target.classList.contains('list')) {
            toggleCompleted(event);

            if (previousListItem !== null && previousListItem !== event.currentTarget) {
                previousListItem.classList.remove('list-active');
            }
            previousListItem = event.currentTarget;
    }
});
step.addEventListener('click', event => {
    event.stopPropagation();
    toggleListContent(event);
});

step.addEventListener('keydown', event => {
    if (event.target.classList.contains('list')) {
        toggleListContent(event);
        toggleCompleted(event);

        if (previousListItem !== null && previousListItem !== event.currentTarget) {
            previousListItem.classList.remove('list-active');
        }
        previousListItem = event.currentTarget;
    }
});
});

