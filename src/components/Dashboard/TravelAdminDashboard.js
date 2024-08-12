// src/components/Dashboard/TravelAdminDashboard.js
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DocumentUploadModal from '../Modals/DocumentUploadModal';
import RequestManagement from '../RequestManagement/RequestManagement';

// Styled Components
const Container = styled.div`
  padding: 2rem;
  background: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.textColor};
  min-height: 100vh;
`;

const Header = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${(props) => props.theme.primaryColor};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.secondaryColor};
  }
`;

const BookingTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  padding: 1rem;
  border-bottom: 2px solid ${(props) => props.theme.borderColor};
  background: ${(props) => props.theme.tableHeaderBackground};
  color: ${(props) => props.theme.tableHeaderText};
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
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
`;

// Animation Variants
const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Travel Admin Dashboard Component
const TravelAdminDashboard = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const { data, error, isLoading } = useQuery('bookings', () => axios.get('/api/bookings').then(res => res.data));

  const handleApprove = (requestId) => {
    setSelectedRequest(requestId);
    setShowUploadModal(true);
  };

  const handleReject = (requestId) => {
    // Handle rejection logic here
    console.log(`Rejected booking ${requestId}`);
  };

  const handleUpload = (requestId, comments) => {
    // Handle document upload and request update here
    console.log(`Request ${requestId} updated with comments: ${comments}`);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings.</p>;

  return (
    <Container>
      <Header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
      >
        Travel Admin Dashboard
      </Header>
      <BookingTable>
        <thead>
          <TableRow
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
          >
            <TableHeader>ID</TableHeader>
            <TableHeader>Employee</TableHeader>
            <TableHeader>Destination</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {data.map(booking => (
            <TableRow
              key={booking.id}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, type: 'spring', stiffness: 70 }}
            >
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.employeeName}</TableCell>
              <TableCell>{booking.destination}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>
                <RequestManagement
                  requestId={booking.id}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </BookingTable>
      
      <DocumentUploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleUpload}
        requestId={selectedRequest}
      />
    </Container>
  );
};

export default TravelAdminDashboard;
