import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

const SearchBar = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.border};
    font-size: 1rem;
  }
  button {
    background: ${(props) => props.theme.primary};
    color: white;
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem;
    margin-left: 0.5rem;
    cursor: pointer;
    &:hover {
      background: ${(props) => props.theme.secondary};
    }
  }
`;

const ActionButton = styled.button`
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) => props.color || '#4CAF50'};
  color: white;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverColor || '#45a049'};
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input, select {
    padding: 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.border};
    font-size: 1rem;
  }
`;

Modal.setAppElement('#root');

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all users
  const { data: users, error, isLoading } = useQuery('users', () =>
    axios.get('/api/Admin/user').then(res => res.data)
  );

  // Add user mutation
  const addUserMutation = useMutation(
    (userData) => axios.post('/api/Admin/user', userData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        toast.success('User added successfully!');
        setIsModalOpen(false);
      },
      onError: () => {
        toast.error('Failed to add user.');
      }
    }
  );

  // Update user mutation
  const updateUserMutation = useMutation(
    ({ userId, updatedData }) =>
      axios.put(`/api/Admin/userupdate/${userId}`, updatedData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        toast.success('User updated successfully!');
        setIsModalOpen(false);
      },
      onError: () => {
        toast.error('Failed to update user.');
      }
    }
  );

  // Assign role mutation
  const assignRoleMutation = useMutation(
    (roleData) => axios.post('/api/Admin/role', roleData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('users');
        toast.success('Role assigned successfully!');
        setIsRoleModalOpen(false);
      },
      onError: () => {
        toast.error('Failed to assign role.');
      }
    }
  );

  // Uncomment if login check is needed
  /*
  const loginCheckMutation = useMutation(
    (credentials) => axios.post('/api/Admin/logincheck', credentials),
    {
      onSuccess: (data) => {
        console.log('Login successful:', data);
      },
      onError: (error) => {
        console.error('Login failed:', error);
      }
    }
  );
  */

  // Handlers for actions
  const handleAddUser = (userData) => {
    addUserMutation.mutate(userData);
  };

  const handleUpdateUser = (userId, updatedData) => {
    updateUserMutation.mutate({ userId, updatedData });
  };

  const handleAssignRole = (roleData) => {
    assignRoleMutation.mutate(roleData);
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const openRoleModal = () => {
    setIsRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    setSelectedRole('');
    setIsRoleModalOpen(false);
  };

  const filteredUsers = users?.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading users.</p>;

  return (
    <Container>
      <Header>Admin Dashboard</Header>
      <SearchBar>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaSearch />
        </button>
      </SearchBar>
      <ActionButton
        color="#28a745"
        hoverColor="#218838"
        onClick={() => openModal(null)}
      >
        <FaPlus /> Add User
      </ActionButton>
      <ActionButton
        color="#007bff"
        hoverColor="#0056b3"
        onClick={openRoleModal}
      >
        <FaPlus /> Assign Role
      </ActionButton>
      <UserTable>
        <thead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Department</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Manager Name</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.managerName}</TableCell>
              <TableCell>
                <ActionButton
                  color="#ffc107"
                  hoverColor="#e0a800"
                  onClick={() => openModal(user)}
                >
                  <FaEdit /> Edit
                </ActionButton>
                <ActionButton
                  color="#dc3545"
                  hoverColor="#c82333"
                  onClick={() => {
                    // handle delete user
                  }}
                >
                  <FaTrash /> Delete
                </ActionButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </UserTable>
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <ModalContent>
          <h2>{selectedUser ? 'Edit User' : 'Add User'}</h2>
          <input
            type="text"
            placeholder="First Name"
            defaultValue={selectedUser?.firstName || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Last Name"
            defaultValue={selectedUser?.lastName || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            defaultValue={selectedUser?.email || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Department"
            defaultValue={selectedUser?.department || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, department: e.target.value })}
          />
          <input
            type="text"
            placeholder="Role"
            defaultValue={selectedUser?.role || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
          />
          <input
            type="text"
            placeholder="Manager Name"
            defaultValue={selectedUser?.managerName || ''}
            onChange={(e) => setSelectedUser({ ...selectedUser, managerName: e.target.value })}
          />
          <button
            onClick={() => {
              selectedUser
                ? handleUpdateUser(selectedUser.id, selectedUser)
                : handleAddUser(selectedUser);
            }}
          >
            {selectedUser ? 'Update User' : 'Add User'}
          </button>
          <button onClick={closeModal}>Close</button>
        </ModalContent>
      </Modal>
      <Modal isOpen={isRoleModalOpen} onRequestClose={closeRoleModal}>
        <ModalContent>
          <h2>Assign Role</h2>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {/* Add options here */}
          </select>
          <button
            onClick={() => {
              handleAssignRole({ role: selectedRole });
            }}
          >
            Assign Role
          </button>
          <button onClick={closeRoleModal}>Close</button>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </Container>
  );
};

export default AdminDashboard;
