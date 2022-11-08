"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_schema_1 = require("../schemas/task.schema");
let TasksService = class TasksService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async create(createTaskDto) {
        try {
            const creatTask = await this.taskModel.create(createTaskDto);
            return creatTask;
        }
        catch (err) {
            if (err.name === "ValidationError") {
                throw new common_1.BadRequestException(err.errors);
            }
            throw new common_1.ServiceUnavailableException();
        }
    }
    async findAll() {
        const tasks = await this.taskModel.find();
        return tasks;
    }
    async findOne(id) {
        const task = await this.taskModel.findById(id);
        if (!task) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found.`);
        }
        return task;
    }
    async update(id, updateTaskDto) {
        const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true });
        if (!updatedTask) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found.`);
        }
        return updatedTask;
    }
    async remove(id) {
        const deletedTask = await this.taskModel.findByIdAndDelete(id);
        if (!deletedTask) {
            throw new common_1.NotFoundException(`Task with ID "${id}" not found.`);
        }
        return { _id: id };
    }
};
TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_schema_1.TASK_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TasksService);
exports.TasksService = TasksService;
//# sourceMappingURL=tasks.service.js.map