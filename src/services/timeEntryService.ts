import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Spring Boot default port

export interface TimeEntry {
  id?: number;
  employeeName: string;
  project: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

export const timeEntryService = {
  createTimeEntry: async (timeEntry: TimeEntry) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/time-entries`, timeEntry);
      return response.data;
    } catch (error) {
      console.error('Error creating time entry:', error);
      throw error;
    }
  },

  getTimeEntries: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/time-entries`);
      return response.data;
    } catch (error) {
      console.error('Error fetching time entries:', error);
      throw error;
    }
  },

  updateTimeEntry: async (id: number, timeEntry: TimeEntry) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/time-entries/${id}`, timeEntry);
      return response.data;
    } catch (error) {
      console.error('Error updating time entry:', error);
      throw error;
    }
  },

  deleteTimeEntry: async (id: number) => {
    try {
      await axios.delete(`${API_BASE_URL}/time-entries/${id}`);
    } catch (error) {
      console.error('Error deleting time entry:', error);
      throw error;
    }
  }
};