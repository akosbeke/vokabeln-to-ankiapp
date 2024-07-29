import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import {
  moduleResource,
  categoryResource,
  vocabularyItemResource,
} from './adminjs/resources';
import { TranslatorModule } from './translator/translator.module';
import { getAdminJsLoader } from './adminjs/adminjs.loader';

Promise.all([import('adminjs'), import('@adminjs/prisma')]).then(
  ([{ AdminJS }, { Database, Resource }]) => {
    AdminJS.registerAdapter({ Database, Resource });
  },
);

@Module({
  imports: [
    ConfigModule.forRoot(),
    // AdminJS version 7 is ESM-only. In order to import it, we have to use dynamic imports.
    Promise.all([
      import('@adminjs/nestjs'),
      import('@adminjs/themes'),
      getAdminJsLoader(),
    ]).then(([{ AdminModule }, { dark, light }, customLoader]) =>
      AdminModule.createAdminAsync({
        customLoader,
        useFactory: async () => {
          const prisma = new PrismaService();

          return {
            adminJsOptions: {
              branding: {
                companyName: 'Deutsch Vokabeln Admin',
                withMadeWithLove: false,
              },
              settings: {
                defaultPerPage: 30,
              },
              defaultTheme: dark.id,
              availableThemes: [dark, light],
              rootPath: '/admin',
              resources: [
                await moduleResource({ client: prisma }),
                await categoryResource({ client: prisma }),
                await vocabularyItemResource({ client: prisma }),
              ],
            },
          };
        },
      }),
    ),
    TranslatorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
