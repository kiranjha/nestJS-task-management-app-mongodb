import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { type } from "os";
import { TaskStatus } from '../tasks/task.enum';

@Schema()
export class Task {
    @Prop( {required: true} )
    title: string;

    @Prop( {required: true} )
    description: string;

    @Prop( {
        type : String,
        enum: Object.keys(TaskStatus),
        default:TaskStatus.OPEN})
    status?: TaskStatus
}
export type TaskDocument = Task & Document;
export const TaskSchema = SchemaFactory.createForClass(Task);
export const TASK_MODEL = Task.name;