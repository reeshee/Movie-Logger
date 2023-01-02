// send a POST request to the server to add a new movie to the database
const form = document.querySelector('#form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.querySelector('#name').value;
  const year = document.querySelector('#year').value;
  const rating = document.querySelector('#rating').value;
  fetch('add-movie.php', {
    method: 'POST',
    body: JSON.stringify({ name, year, rating }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.text())
    .then(result => {
      if (result === 'success') {
        // clear the form and update the table
        form.reset();
        updateTable();
      } else {
        alert('Error: ' + result);
      }
    });
});

// send a GET request to the server to retrieve the list of movies from the database
function updateTable() {
  fetch('get-movies.php')
    .then(response => response.json())
    .then(movies => {
      const tbody = document.querySelector('#movies tbody');
      tbody.innerHTML = '';
      for (const movie of movies) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${movie.name}</td>
          <td>${movie.year}</td>
          <td>${movie.rating}</td>
          <td><button data-id="${movie.id}" class="delete">x</button></td>
        `;
        tbody.appendChild(tr);
      }
    });
}
updateTable();

// send a DELETE request to the server to remove a movie from the database
const tbody = document.querySelector('#movies tbody');
tbody.addEventListener('click', e => {
  if (e.target.classList.contains('delete')) {
    const id = e.target.dataset.id;
    fetch('delete-movie.php', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.text())
      .then(result => {
        if (result === 'success') {
          updateTable();
        } else {
          alert('Error: ' + result);
        }
      });
  }
});