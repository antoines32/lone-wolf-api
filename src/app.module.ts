import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AdventureModule } from './adventure/adventure.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://ASUser:QfQYPAkCpb830n1Y@atlascluster.4glktdb.mongodb.net/AdventureBook?retryWrites=true&w=majority',
    ),
    AdventureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
