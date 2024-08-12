import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${(props) => props.theme.background};
`;

export const Form = styled.form`
  background-color: ${(props) => props.theme.formBackground};
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  width: 300px;
`;

export const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  font-size: 1rem;
  color: ${(props) => props.theme.inputTextColor};
  background-color: ${(props) => props.theme.inputBackground};

  &:focus {
    border-color: ${(props) => props.theme.focusBorderColor};
    outline: none;
  }
`;

export const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: ${(props) => props.theme.buttonBackground};
  color: ${(props) => props.theme.buttonTextColor};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.buttonHoverBackground};
  }
`;
