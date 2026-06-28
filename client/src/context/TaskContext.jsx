import React, { createContext, useState, useCallback } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [stats, setStats] = useState({ total: 0, pending: 0, inProgress: 0, completed: 0 });

  // Fetch tasks with query params
  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const { data } = await api.get('/tasks', { params });
      setTasks(data.data);
      setPagination({
        page: data.page,
        pages: data.pages,
        total: data.total
      });
      
      // We could also compute stats here or have a separate endpoint.
      // For simplicity, let's fetch all tasks stats without pagination if needed,
      // or compute based on current list. Actually, a real app would have a /stats endpoint.
      // But we can approximate by fetching all tasks without limit for stats, or computing from what we have.
      // Let's compute stats by fetching without pagination just for the stats, or keep it simple.
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all tasks for stats
  const fetchStats = useCallback(async () => {
    try {
      const { data } = await api.get('/tasks', { params: { limit: 1000 } });
      const allTasks = data.data;
      setStats({
        total: data.total,
        pending: allTasks.filter(t => t.status === 'Pending').length,
        inProgress: allTasks.filter(t => t.status === 'In Progress').length,
        completed: allTasks.filter(t => t.status === 'Completed').length,
      });
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  }, []);

  const addTask = async (taskData) => {
    try {
      await api.post('/tasks', taskData);
      toast.success('Task created successfully!');
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      await api.put(`/tasks/${id}`, taskData);
      toast.success('Task updated successfully!');
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      toast.success('Task deleted successfully!');
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        pagination,
        stats,
        fetchTasks,
        fetchStats,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
