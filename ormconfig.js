module.exports = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "1234",
  database: "ee",
  synchronize: false,
  "entities": [
    "dist/**/*.entity{.ts,.js}",
    "src/**/*.entity{.ts,.js}"
  ],
  migrations: ["src/migration/**.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration"
  },
};