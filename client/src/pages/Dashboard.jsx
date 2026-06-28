import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import DashboardCards from '../components/DashboardCards';
import FilterPanel from '../components/FilterPanel';
import TaskList from '../components/TaskList';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { tasks, loading, pagination, fetchTasks, fetchStats, addTask, updateTask, deleteTask } = useTasks();
  
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
    page: 1,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Fetch tasks when filters or pagination changes
  useEffect(() => {
    fetchTasks(filters);
  }, [filters, fetchTasks]);

  // Fetch stats initially and after any create/update/delete operation
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleOpenModal = (task = null) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingTask(null);
    setIsModalOpen(false);
  };

  const handleTaskSubmit = async (taskData) => {
    let success = false;
    if (editingTask) {
      success = await updateTask(editingTask._id, taskData);
    } else {
      success = await addTask(taskData);
    }
    
    if (success) {
      handleCloseModal();
      fetchTasks(filters); // refresh list
      fetchStats(); // refresh stats
    }
  };

  const confirmDelete = (id) => {
    setTaskToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (taskToDelete) {
      const success = await deleteTask(taskToDelete);
      if (success) {
        setIsDeleteModalOpen(false);
        setTaskToDelete(null);
        fetchTasks(filters);
        fetchStats();
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setFilters(prev => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage your tasks efficiently.</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>

      <DashboardCards />
      
      <FilterPanel filters={filters} setFilters={setFilters} />
      
      <TaskList 
        tasks={tasks} 
        loading={loading} 
        onEdit={handleOpenModal} 
        onDelete={confirmDelete} 
      />

      {/* Pagination Controls */}
      {!loading && tasks.length > 0 && pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 dark:text-white"
          >
            Previous
          </button>
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg disabled:opacity-50 dark:text-white"
          >
            Next
          </button>
        </div>
      )}

      {/* Task Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTask ? 'Edit Task' : 'Create New Task'}
      >
        <TaskForm
          initialData={editingTask}
          onSubmit={handleTaskSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Deletion"
      >
        <div className="space-y-4">
          <p className="text-gray-700 dark:text-gray-300">
            Are you sure you want to delete this task? This action cannot be undone.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Task
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
