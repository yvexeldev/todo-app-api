import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const PORT = process.env.PORT;
    await app.listen(PORT, () => {
        console.log(`SERVER RUNNING IN --> ${PORT}`);
    });
}

bootstrap();
