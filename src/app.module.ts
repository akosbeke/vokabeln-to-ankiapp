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
    Promise.all([
      import('@adminjs/nestjs'),
      import('@adminjs/prisma'),
      import('@adminjs/themes'),
    ]).then(([{ AdminModule }, { getModelByName }, { dark, light }]) =>
      AdminModule.createAdminAsync({
        useFactory: () => {
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
                {
                  resource: {
                    model: getModelByName('Module'),
                    client: prisma,
                  },
                  options: {
                    navigation: {},
                  },
                },
                {
                  resource: {
                    model: getModelByName('Category'),
                    client: prisma,
                  },
                  options: {
                    navigation: {},
                  },
                },
                {
                  resource: {
                    model: getModelByName('VocabularyItem'),
                    client: prisma,
                  },
                  options: {
                    navigation: {},
                    sort: {
                      sortBy: 'id',
                    },
                    listProperties: [
                      'word',
                      'plural',
                      'meaning',
                      'ranking',
                      'category',
                      'level',
                    ],
                    editProperties: [
                      'word',
                      'plural',
                      'ranking',
                      'meaning',
                      'exampleSentence',
                      'category',
                      'level',
                    ],
                    properties: {
                      word: {
                        type: 'richtext',
                        isTitle: true,
                      },
                      level: {
                        availableValues: [
                          { value: 'A1_2', label: 'A-level' },
                          { value: 'B1_2', label: 'B-level' },
                        ],
                      },
                    },
                  },
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
