window.onload = function() {
  const userLoggedIn = localStorage.getItem('userLoggedIn');
  const userId = localStorage.getItem('userId');
  const loginLink = document.getElementById('login-link');
  const signupLink = document.getElementById('signup-link');
  const userInfo = document.getElementById('user-info');
  const userNameElement = document.getElementById('user-name');

  if (userLoggedIn === 'true' && userId) {
      
      if (loginLink && signupLink) {
          loginLink.style.display = 'none';
          signupLink.style.display = 'none';
      }

      if (userInfo) {
          userInfo.style.display = 'inline';
      }

      
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
      
      if (loginLink && signupLink) {
          loginLink.style.display = 'inline';
          signupLink.style.display = 'inline';
      }

      
      if (userInfo) {
          userInfo.style.display = 'none';
      }
  }
};

