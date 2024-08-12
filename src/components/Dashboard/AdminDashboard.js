import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';


const Container = styled.div`
  padding: 2rem;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  min-height: 100vh;
`;

const Header = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${(props) => props.theme.primary};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.secondary};
  }
`;

const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  padding: 1rem;
  border-bottom: 2px solid ${(props) => props.theme.border};
  background: ${(props) => props.theme.tableHeader};
  color: ${(props) => props.theme.headerText};
  text-align: left;
`;

const TableRow = styled(motion.tr)`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.tableRowEven};
  }
  &:nth-child(odd) {
    background-color: ${(props) => props.theme.tableRowOdd};
  }
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.tableRowHover};
    transform: scale(1.03);
    transition: all 0.3s ease;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.border};
`;

// Animation Variants
const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const { data, error, isLoading } = useQuery('users', () => axios.get('/api/users'));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <Container>
      <Header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
      >
        Admin Dashboard
      </Header>
      <UserTable>
        <thead>
          <TableRow
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
          >
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data.map(user => (
            <TableRow
              key={user.id}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, type: 'spring', stiffness: 70 }}
            >
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <button 
                  style={{ 
                    marginRight: '0.5rem', 
                    padding: '0.5rem 1rem', 
                    border: 'none', 
                    borderRadius: '0.25rem', 
                    backgroundColor: '#4CAF50', 
                    color: 'white', 
                    cursor: 'pointer' 
                  }}
                  onClick={() => handleEdit(user.id)}
                >
                  Edit
                </button>
                <button 
                  style={{ 
                    padding: '0.5rem 1rem', 
                    border: 'none', 
                    borderRadius: '0.25rem', 
                    backgroundColor: '#f44336', 
                    color: 'white', 
                    cursor: 'pointer' 
                  }}
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </UserTable>
    </Container>
  );
};

// Dummy functions for handling actions
const handleEdit = (id) => {
  console.log(`Edit user ${id}`);
};

const handleDelete = (id) => {
  console.log(`Delete user ${id}`);
};

export default AdminDashboard;
