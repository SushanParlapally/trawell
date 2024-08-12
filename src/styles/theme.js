// ./styles/theme.js

export const lightTheme = {
  backgroundColor: '#f4f4f4',
  textColor: '#333',
  cardBackground: '#fff',
  cardShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  primaryColor: '#007bff',
  secondaryColor: '#0056b3',
};

export const darkTheme = {
  backgroundColor: '#333',
  textColor: '#f4f4f4',
  cardBackground: '#444',
  cardShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  primaryColor: '#007bff',
  secondaryColor: '#0056b3',
};

// Function to toggle theme
export const toggleTheme = (currentTheme) => {
  return currentTheme === lightTheme ? darkTheme : lightTheme;
};
