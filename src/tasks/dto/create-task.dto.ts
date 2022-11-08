import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.enum';
export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;


    @IsNotEmpty()
    @IsString()
    description: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status: string;
}