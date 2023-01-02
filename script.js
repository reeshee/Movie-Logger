// movie-logger.js

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

// Render the movie list to the page
function renderMovies(sortField = '', sortDirection = '') {
  const movieTable = document.querySelector('#movie-table tbody');
  movieTable.innerHTML = '';
  // Sort the movies array
  if (sortField && sortDirection) {
    movies.sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      } else if (sortField === 'releaseYear') {
        return sortDirection === 'asc' ? a.releaseYear - b.releaseYear : b.releaseYear - a.releaseYear;
      } else if (sortField === 'rating') {
        return sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating;
      }
    });
  }
  // Populate the table with the sorted movies array
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
