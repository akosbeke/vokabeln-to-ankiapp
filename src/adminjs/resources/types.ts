import type { ResourceWithOptions } from 'adminjs' with { 'resolution-mode': 'require' };
import { PrismaService } from 'src/prisma.service';

export interface ResourceOptions {
  client: PrismaService;
}

export type Resource = ({
  client,
}: ResourceOptions) => Promise<ResourceWithOptions>;
