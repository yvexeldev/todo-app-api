import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
// import {  } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/create-user.dto';
import { userGuard } from './guards/user-self.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/signup')
    async signup(@Body() registerDto: RegisterDto) {
        return await this.userService.signup(registerDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto) {
        return this.userService.login(loginDto);
    }

    // @Get()
    // findAll() {
    //     return this.userService.findAll();
    // }

    @UseGuards(userGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @UseGuards(userGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await this.userService.update(id, updateUserDto);
    }

    @UseGuards(userGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.remove(id);
    }
}
