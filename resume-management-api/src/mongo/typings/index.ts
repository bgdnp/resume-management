export type TMongoConfig = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export type TSchema<T> = { new (doc?: T): T };
