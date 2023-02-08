import { Types } from 'mongoose';
import {
    IsBoolean, IsBooleanString,
    IsDateString,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsBooleanString()
    @IsOptional()
    status: boolean;

    @IsDateString()
    @IsNotEmpty()
    expiringDate: Date;
}
