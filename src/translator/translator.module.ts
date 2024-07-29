import { Module } from '@nestjs/common';
import { TranslatorService } from './translator.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [TranslatorService],
})
export class TranslatorModule {}
