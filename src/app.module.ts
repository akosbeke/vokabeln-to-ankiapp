import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

Promise.all([import('adminjs'), import('@adminjs/prisma')]).then(
  ([{ AdminJS }, { Database, Resource }]) => {
    AdminJS.registerAdapter({ Database, Resource });
  },
);

@Module({
  imports: [
    ConfigModule.forRoot(),
    // AdminJS version 7 is ESM-only. In order to import it, you have to use dynamic imports.
    Promise.all([import('@adminjs/nestjs'), import('@adminjs/prisma')]).then(
      ([{ AdminModule }, { getModelByName }]) =>
        AdminModule.createAdminAsync({
          useFactory: () => {
            const prisma = new PrismaService();

            return {
              adminJsOptions: {
                rootPath: '/admin',
                resources: [
                  {
                    resource: {
                      model: getModelByName('Module'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('Category'),
                      client: prisma,
                    },
                    options: {},
                  },
                  {
                    resource: {
                      model: getModelByName('VocabularyItem'),
                      client: prisma,
                    },
                    options: {
                      properties: {
                        word: {
                          type: 'richtext',
                        },
                      },
                    },
                  },
                  {
                    resource: {
                      model: getModelByName('VocabularyItemLevel'),
                      client: prisma,
                    },
                    options: {},
                  },
                ],
              },
            };
          },
        }),
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
