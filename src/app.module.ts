import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [TasksModule,
    MongooseModule.forRoot("mongodb://localhost:27017/task_app_db"),
  ],
})
export class AppModule {}
