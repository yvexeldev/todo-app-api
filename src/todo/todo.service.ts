import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
    constructor(@InjectModel('Todo') private todoModel: Model<Todo>) {}

    async create(createTodoDto: CreateTodoDto) {
        try {
            const newTodo = await this.todoModel.create(createTodoDto);
            await newTodo.save();
            return newTodo.populate('user');
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.message);
        }
    }

    async findAll() {
        try {
            return await this.todoModel.find().populate('user');
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.message);
        }
    }

    async findOne(id: string) {
        try {
            return await this.todoModel.findById(id).populate('user');
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.message);
        }
    }

    async userTodos(id: string) {
        try {
            const todos = await this.todoModel.find();

            const result = [];
            todos.forEach((item) => {
                if (item._id == item._id.toString()) {
                    result.push(item);
                }
            });
            return result;
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.message);
        }
    }

    async update(id: string, updateTodoDto: UpdateTodoDto) {
        try {
            return await this.todoModel
                .findByIdAndUpdate(id, { ...updateTodoDto }, { new: true })
                .populate('user');
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.mess);
        }
    }

    async remove(id: string) {
        try {
            return await this.todoModel
                .findByIdAndDelete(id, {
                    returnOriginal: true,
                })
                .populate('user');
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.mess);
        }
    }
}
