import ErrorHandler from "../middlewares/error.js";
import Task from "../models/task.models.js";

export const newtask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await Task.create({
      title,
      description,
      user: req.user, //is auth set the req.user
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMytasks = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const tasks = await Task.find({ user: userid });

    res.status(201).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const Updatetask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new ErrorHandler("Task not found", 404));
    }
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(201).json({
      success: true,
      message: "Task Updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deletetask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(new ErrorHandler("Task not found", 404));
    }
    await task.deleteOne();

    res.status(201).json({
      success: true,
      message: "Task Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
