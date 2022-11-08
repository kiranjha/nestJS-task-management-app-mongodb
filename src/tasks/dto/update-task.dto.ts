import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.enum';
export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title: string;


    @IsOptional()
    @IsString()
    description: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status: string;
}