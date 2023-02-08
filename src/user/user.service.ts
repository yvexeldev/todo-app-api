import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expression, Model } from 'mongoose';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async create(createUserDto: RegisterDto) {
        try {
            const newUser = await new this.userModel(createUserDto);
            await newUser.save();
            return newUser;
        } catch (e) {
            console.log(e);
            throw new BadRequestException(e.message);
        }
    }

    async signup(registerDto: RegisterDto) {
        try {
            const candidate = await this.getByEmail(registerDto.email);
            if (candidate) {
                throw new BadRequestException(
                    'BUNDAY EMAILDA USER MAVJUD ILTIMOS LOGIN QILING',
                );
            }
            const hashPassword = await bcrypt.hash(registerDto.password, 7);
            const user = await this.create({
                ...registerDto,
                password: hashPassword,
            });
            const token = await this.generateToken(user);
            return {
                token: token,
                id: user._id,
            };
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.message);
        }
    }

    async login(loginDto: LoginDto) {
        try {
            const user = await this.validateUser(loginDto);
            const token = await this.generateToken(user);
            return {
                token,
                id: user.id,
            };
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.message);
        }
    }

    async generateToken(user: User) {
        try {
            const payload = {
                email: user.email,
                sub: user._id,
            };
            return this.jwtService.sign(payload);
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    async getByEmail(email: string) {
        try {
            return await this.userModel.findOne({ email });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.message);
        }
    }

    private async validateUser(loginDto: LoginDto) {
        const user = await this.getByEmail(loginDto.email);
        if (!user) {
            throw new BadRequestException('USER_NOT_FOUND', 'BAD_REQUEST');
        }
        const passwordEquals = await bcrypt.compare(
            loginDto.password,
            user.password,
        );
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException('EMAIL_OR_PASSWORD_INCORRECT');
    }

    async findAll() {
        try {
            return await this.userModel.find().populate('todos');
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async findOne(id: string) {
        try {
            return await this.userModel.findById(id).populate('todos');
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        try {
            return await this.userModel.findByIdAndUpdate(
                id,
                { ...updateUserDto },
                { new: true },
            );
        } catch (e) {
            throw new InternalServerErrorException(e.message);
        }
    }

    async remove(id: string) {
        try {
            return await this.userModel.findByIdAndRemove(id, {
                returnOriginal: true,
            });
        } catch (e) {
            console.log(e);
            throw new InternalServerErrorException(e.message);
        }
    }


}
