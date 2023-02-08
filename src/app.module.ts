import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import * as process from 'process';

@Module({
    imports: [
        UserModule,
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.DB_URL),
        TodoModule,

    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
