import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import axiosMock from 'axios-mock-adapter';
import { ProjectContent, updateProjects } from '../src/components/projectContent';
import { AdminManagerPage } from '../src/components/adminManagerPage';

const mock = new axiosMock(axios);

describe('ProjectContent', () => {
  it('displays an additional card when a new project is added', async () => {
    mock.onGet("http://localhost:8080/api/project").reply(200, []);

const { rerender } = render(<ProjectContent />);

    await waitFor(() => expect(screen.queryByText(/No projects found/i)).not.toBeInTheDocument());

    expect(screen.queryAllByRole('article')).toHaveLength(0);

    const newProject = { title: 'New Project', description: 'A new project', image: 'path/to/image', url: 'http://newproject.com' };
    mock.onPut("http://localhost:8080/api/project").reply(200);
    mock.onGet("http://localhost:8080/api/project").reply(200, [newProject]);

    render(<AdminManagerPage />);
    userEvent.type(screen.getByPlaceholderText(/Enter project title/i), newProject.title);
    userEvent.type(screen.getByPlaceholderText(/Enter project URL/i), newProject.url);
    userEvent.type(screen.getByPlaceholderText(/Enter project description/i), newProject.description);
    fireEvent.change(screen.getByLabelText(/Project Image/i), { target: { files: [new File(['image'], 'image.png', { type: 'image/png' })] } });

    userEvent.click(screen.getByText(/Submit/i));

    rerender(<ProjectContent />);

    await waitFor(() => expect(screen.getByText(newProject.title)).toBeInTheDocument());

    expect(screen.getAllByRole('article')).toHaveLength(1);
  });
});
