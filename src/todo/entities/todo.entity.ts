import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { User } from '../../user/entities/user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
    versionKey: false,
})
export class Todo {
    _id: string;

    @Prop({
        required: true,
        trim: true,
    })
    title: string;

    @Prop({
        default: false,
        trim: true,
    })
    status: boolean;

    @Prop()
    expiringDate: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
