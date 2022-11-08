/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksController } from './tasks.controller';
import { TaskSchema, TASK_MODEL } from 'src/schemas/task.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: TASK_MODEL, schema: TaskSchema}]),],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
