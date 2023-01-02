// Handle form submission
const form = document.querySelector('#movie-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const movie = {
    name: formData.get('name'),
    releaseYear: formData.get('releaseYear'),
    rating: formData.get('rating')
  };
  addMovie(movie);
  form.reset();  // Clear the form
});

// Dark mode toggle
function toggleColorMode() {
  const body = document.querySelector('body');
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  }
}

// Load existing movie data from local storage
const movies = JSON.parse(localStorage.getItem('movies')) || [];
renderMovies();

// Add a movie to the list and save to local storage
function addMovie(movie) {
  movies.push(movie);
  localStorage.setItem('movies', JSON.stringify(movies));
  renderMovies();
}

// Delete a movie from the list and save to local storage
function deleteMovie(index) {
  movies.splice(index, 1);
  localStorage.setItem('movies', JSON.stringify(movies));
  renderMovies();
}

// Sort the movie list by rating
function sortByRating(order) {
  if (order === 'asc') {
    movies.sort((a, b) => a.rating - b.rating);
  } else {
    movies.sort((a, b) => b.rating - a.rating);
  }
  renderMovies();
}

// Sort the movie list by release year
function sortByReleaseYear(order) {
  if (order === 'asc') {
    movies.sort((a, b) => b.releaseYear - a.releaseYear);
  } else {
    movies.sort((a, b) => a.releaseYear - b.releaseYear);
  }
  renderMovies();
}

// Render the movie list to the page
function renderMovies() {
  const movieTable = document.querySelector('#movie-table tbody');
  movieTable.innerHTML = '';
  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i];
    const tr = document.createElement('tr');
    const nameTd = document.createElement('td');
    nameTd.textContent = movie.name;
    tr.appendChild(nameTd);
    const releaseYearTd = document.createElement('td');
    releaseYearTd.textContent = movie.releaseYear;
    tr.appendChild(releaseYearTd);
    const ratingTd = document.createElement('td');
    ratingTd.textContent = movie.rating;
    tr.appendChild(ratingTd);
    const deleteTd = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', () => {
      deleteMovie(i);
    });
    deleteTd.appendChild(deleteButton);
    tr.appendChild(deleteTd);
    movieTable.appendChild(tr);
  }
}