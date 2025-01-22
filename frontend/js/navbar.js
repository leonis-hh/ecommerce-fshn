window.onload = function() {
  const userLoggedIn = localStorage.getItem('userLoggedIn');
  const userId = localStorage.getItem('userId');
  const loginLink = document.getElementById('login-link');
  const signupLink = document.getElementById('signup-link');
  const userInfo = document.getElementById('user-info');
  const userNameElement = document.getElementById('user-name');
  const logoutLink = document.getElementById('logout-link');  // If logout link is present

  if (userLoggedIn === 'true' && userId) {
      // If logged in, hide login/signup links and show user info
      if (loginLink && signupLink) {
          loginLink.style.display = 'none';
          signupLink.style.display = 'none';
      }

      if (userInfo) {
          userInfo.style.display = 'inline';
      }

      // Fetch user data using the userId
      fetch(`http://localhost:8080/api/users/${userId}`)
          .then(response => response.json())
          .then(data => {
              if (data && data.name) {
                  userNameElement.textContent = data.name;  // Update the name
              } else {
                  userNameElement.textContent = 'User';  // Fallback name
              }
          })
          .catch(error => {
              console.error('Error fetching user profile:', error);
              userNameElement.textContent = 'User';  // Fallback in case of error
          });
  } else {
      // If not logged in, show login/signup links
      if (loginLink && signupLink) {
          loginLink.style.display = 'inline';
          signupLink.style.display = 'inline';
      }

      // Hide user info
      if (userInfo) {
          userInfo.style.display = 'none';
      }
  }
};

