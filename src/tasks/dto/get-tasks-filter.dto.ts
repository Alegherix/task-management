import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  @IsIn(Object.values(TaskStatus))
  @IsOptional()
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
