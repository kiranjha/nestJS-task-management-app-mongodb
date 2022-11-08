/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, ServiceUnavailableException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TASK_MODEL, TaskDocument } from 'src/schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(TASK_MODEL) private taskModel: Model<TaskDocument>) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const creatTask = await this.taskModel.create(createTaskDto);
      return creatTask;
    } catch (err) {
      if(err.name === "ValidationError") {
        throw new BadRequestException(err.errors);
      } 
      throw new ServiceUnavailableException();
    }
  }

  async findAll() {
    const tasks = await this.taskModel.find();
    return tasks;
  }

  async findOne(id: string) {
      const task = await this.taskModel.findById(id);
      if(!task) {
        throw new NotFoundException(`Task with ID "${id}" not found.`);
      }
      return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, {new: true});
    if(!updatedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
    return updatedTask;
  }

  async remove(id: string) {
    const deletedTask = await this.taskModel.findByIdAndDelete(id);
    if(!deletedTask) {
      throw new NotFoundException(`Task with ID "${id}" not found.`);
    }
    return { _id: id };
  }

  // private tasks: Task[] = []; 

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskWithFilters(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;

  //   let tasks = this.getAllTasks();

  //   if(status) {
  //     tasks = tasks.filter( (task) => task.status === status);
  //   }

  //   if(search) {
  //     tasks = tasks.filter( (task) => {
  //       if(task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   return tasks;
  // }

  // getTaskById(id: string): Task {
  //   const found = this.tasks.find( (task) => task.id === id);
  //   if(!found){
  //     throw new NotFoundException(`Task with ID "${id}" not found.`);
  //   } 
  //   return found;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //       id : uuid(),
  //       title,
  //       description,
  //       status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  
  // deleteTaskById(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter( (task) => task.id !== id);
  // }

}
