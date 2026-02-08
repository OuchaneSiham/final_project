const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require('pg');

const connectionString = "postgresql://transcendence_user:ghizlane4074.M@localhost:5432/transcendence_db";
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

module.exports =  prisma


//-> i have to change it later to

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default prisma;

//  url      = env("DATABASE_URL")
