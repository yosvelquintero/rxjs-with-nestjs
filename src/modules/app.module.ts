import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { GithubModule } from './github/github.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ProductsModule, GithubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
