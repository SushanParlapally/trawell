import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
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

const RequestTable = styled.table`
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

// Employee Dashboard Component
const EmployeeDashboard = () => {
  const { data, error, isLoading } = useQuery('requests', () => axios.get('/api/requests'));

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading requests.</p>;

  return (
    <Container>
      <Header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
      >
        Employee Dashboard
      </Header>
      <RequestTable>
        <thead>
          <TableRow
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
          >
            <TableHeader>ID</TableHeader>
            <TableHeader>Destination</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data.map(request => (
            <TableRow
              key={request.id}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, type: 'spring', stiffness: 70 }}
            >
              <TableCell>{request.id}</TableCell>
              <TableCell>{request.destination}</TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>{request.status}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </RequestTable>
    </Container>
  );
};

export default EmployeeDashboard;
