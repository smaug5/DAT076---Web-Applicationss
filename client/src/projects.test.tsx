import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ProjectContent, { updateProjects } from './components/projectContent'; // Adjust the import path as necessary

// Mock the projects data
const mockProjects = [
  { title: 'Project 1', image: 'image1.jpg', description: 'Description 1', url: 'URL1' },
  { title: 'Project 2', image: 'image2.jpg', description: 'Description 2', url: 'URL2' },
  // Add more projects as needed
];

describe('ProjectContent Component', () => {
  it('renders the correct number of projects', async () => {
    const mock = new MockAdapter(axios);
    mock.onGet("http://localhost:8080/api/project").reply(200, mockProjects);

    const { getAllByRole } = render(<ProjectContent />);

    console.log("works")

    await waitFor(() => {
      expect(getAllByRole('img')).toHaveLength(mockProjects.length);
    });
  });
});
