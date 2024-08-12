
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Set base font and colors */
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    color: #333;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
    color: #222;
  }

  p {
    margin-bottom: 1em;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
  }

  /* Custom variables for theming */
  :root {
    --primary-color: #007bff;
    --secondary-color: #0056b3;
    --background-color: #f4f4f4;
    --text-color: #333;
    --card-background: #fff;
    --card-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* Light theme */
  .light-theme {
    --background-color: #f4f4f4;
    --text-color: #333;
    --card-background: #fff;
    --card-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  /* Dark theme */
  .dark-theme {
    --background-color: #333;
    --text-color: #f4f4f4;
    --card-background: #444;
    --card-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  /* Apply theme colors */
  body {
    background-color: var(--background-color);
    color: var(--text-color);
  }

  .card {
    background: var(--card-background);
    box-shadow: var(--card-shadow);
    border-radius: 8px;
    padding: 20px;
  }

  button {
    background-color: var(--primary-color);
    color: #fff;
    padding: 10px;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
      background-color: var(--secondary-color);
    }
  }
`;

export default GlobalStyle;
