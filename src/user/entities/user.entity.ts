import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Todo } from '../../todo/entities/todo.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class User {
    _id: string;

    @Prop({
        required: true,
        trim: true,
    })
    first_name: string;

    @Prop({
        required: false,
        trim: true,
    })
    last_name: string;

    @Prop({
        required: true,
        trim: true,
        unique: true,
    })
    email: string;

    @Prop({
        required: true,
        trim: true,
    })
    password: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }] })
    todos: Todo[];
}

export const UserSchema = SchemaFactory.createForClass(User);
