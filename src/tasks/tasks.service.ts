import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.tdo';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // Could delete since we're going to use database
  // private tasks: Task[] = [];
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       task =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  // getTaskById(id: string): Task {
  //   const task = this.tasks.find(task => task.id === id);
  //   if (!task) {
  //     throw new NotFoundException();
  //   }
  //   return task;
  // }
  async deleteTaskById(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const selectedTask = this.getTaskById(id);
  //   selectedTask.status = status;
  //   return selectedTask;
  // }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuidv1(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
}
