const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');

// Validation middleware array for creation and update
const taskValidation = [
  check('title', 'Title is required and must be at least 3 characters long')
    .notEmpty()
    .isLength({ min: 3 }),
 
];

router.route('/')
  .get(getTasks)
  .post(taskValidation, createTask);

router.route('/:id')
  .get(getTask)
  .put(taskValidation, updateTask)
  .delete(deleteTask);

module.exports = router;
