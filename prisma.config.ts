import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Prisma 7：迁移 / 反向工程命令使用这里的 URL
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
