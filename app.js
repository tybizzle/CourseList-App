// UI Variables
const form = document.querySelector('#course-form'),
      courseInput = document.querySelector('#course'),
      courseList = document.querySelector('.collection'),
      filter = document.querySelector('#filter'),
      clearCourses = document.querySelector('.clear-courses');

// Load event listeners
loadEventListeners();

// Load Event Listeners
  function loadEventListeners() {
  document.addEventListener('DOMContentLoaded', getCourses);
  form.addEventListener('submit', addCourse);
  courseList.addEventListener('click', removeCourse);
  clearCourses.addEventListener('click', clearAllCourses);
  filter.addEventListener('keyup', filterCourses);
}

// Function addCourse
function addCourse(e) {
  if(courseInput.value === '') {
    alert('Add a course!');
  }
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and apeend to li
  li.appendChild(document.createTextNode(courseInput.value));
  // Create link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Add icon to link
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to li
  li.appendChild(link);

  // Append li to ul
  courseList.appendChild(li);

  // Store in LS
  storeCourseInLocalStorage(courseInput.value);

  // Clear input
  courseInput.value = '';  

  e.preventDefault();
}

// Function get courses from LS(to display in the UI)
function getCourses() {
  let courses;
  if(localStorage.getItem('courses') === null) {
    courses = [];
  } else {
    courses = JSON.parse(localStorage.getItem('courses'));
  }

  courses.forEach(function(course) {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append
    li.appendChild(document.createTextNode(course));
    // Create link
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon to link
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);

    // Append li to ul
    courseList.appendChild(li);
  });
}

// Function Store in LS
function storeCourseInLocalStorage(course) {
  let courses;
  if(localStorage.getItem('courses') === null) {
    courses = [];
  } else {
    courses = JSON.parse(localStorage.getItem('courses'));
  }

  courses.push(course);

  localStorage.setItem('courses', JSON.stringify(courses));
}

// Function removeCourse
function removeCourse(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }

  // Remove from LS
  removeFromLocalStorage(e.target.parentElement.parentElement);

  e.preventDefault();
}

// Function remove from LS
function removeFromLocalStorage(courseItem) {
  let courses;
  if(localStorage.getItem('courses') === null) {
    courses = [];
  } else {
    courses = JSON.parse(localStorage.getItem('courses'))
  }

  courses.forEach(function(course, index) {
    if(courseItem.textContent === course) {
      courses.splice(index, 1);
    }
  });
  localStorage.setItem('courses', JSON.stringify(courses));
}

// Function clear all courses
function clearAllCourses() {
  confirm('Do you want to clear all the courses?')
  courseList.innerHTML = '';

  // Clear from LS
  clearCoursesFromLocalStorage();
}

// Function clear from ls
function clearCoursesFromLocalStorage() {
  localStorage.clear();
}

// Filter through courses
function filterCourses(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}