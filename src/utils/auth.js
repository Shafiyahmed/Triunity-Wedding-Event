// Simple authentication using localStorage
export const auth = {
  isAuthenticated: false,

  signUp(userData) {
    try {
      // Get existing users
      const existingUsers = JSON.parse(localStorage.getItem('triunity_users') || '[]');
      
      // Check if user already exists
      if (existingUsers.some(user => user.email === userData.email)) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        role: 'user'
      };

      // Save to localStorage
      existingUsers.push(newUser);
      localStorage.setItem('triunity_users', JSON.stringify(existingUsers));
      
      // Store current session
      localStorage.setItem('triunity_current_user', JSON.stringify(newUser));
      localStorage.setItem('triunity_token', 'user-token-' + Date.now());
      
      this.isAuthenticated = true;
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  signIn(email, password) {
    try {
      const users = JSON.parse(localStorage.getItem('triunity_users') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid email or password');
      }

      // Store current session
      localStorage.setItem('triunity_current_user', JSON.stringify(user));
      localStorage.setItem('triunity_token', 'user-token-' + Date.now());
      
      this.isAuthenticated = true;
      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  signOut() {
    localStorage.removeItem('triunity_current_user');
    localStorage.removeItem('triunity_token');
    this.isAuthenticated = false;
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('triunity_current_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isLoggedIn() {
    return !!localStorage.getItem('triunity_token');
  }
};