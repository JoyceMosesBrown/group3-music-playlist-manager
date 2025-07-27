document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname;

  const token = localStorage.getItem('token') || '';
  const form = document.getElementById('songForm');
  const songsTableBody = document.querySelector('#songsTable tbody');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // INDEX PAGE: Load and render songs
  if (currentPage.includes('index.html')) {
    async function loadSongs() {
      try {
        const res = await fetch('http://localhost:5000/api/songs', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const songs = await res.json();
        songsTableBody.innerHTML = '';
        songs.forEach(song => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${song.title}</td>
            <td>${song.artist}</td>
            <td>${song.album || '-'}</td>
            <td>${song.duration || '-'}</td>
            <td class="actions">
              <button onclick="deleteSong('${song._id}')">Delete</button>
            </td>
          `;
          songsTableBody.appendChild(row);
        });
      } catch (err) {
        console.error('Error loading songs:', err);
      }
    }

    // Add song
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const song = {
          title: form.title.value,
          artist: form.artist.value,
          album: form.album.value,
          duration: form.duration.value
        };

        await fetch('http://localhost:5000/api/songs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(song)
        });

        form.reset();
        loadSongs();
      });
    }

    // Delete song
    window.deleteSong = async (id) => {
      await fetch(`http://localhost:5000/api/songs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      loadSongs();
    };

    loadSongs();
  }

  // LOGIN PAGE
  if (currentPage.includes('login.html')) {
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          alert('Login successful!');
          window.location.href = 'index.html'; // Redirect to homepage
        } else {
          alert(data.message || 'Login failed!');
        }
      });
    }
  }

  // REGISTER PAGE
  if (currentPage.includes('register.html')) {
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (data.message === 'User registered successfully') {
          alert('Registration successful! Please log in.');
          window.location.href = 'login.html';
        } else {
          alert(data.message || 'Registration failed!');
        }
      });
    }
  }
});
