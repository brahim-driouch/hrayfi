import { PrismaClient } from "@prisma/client/extension";


 declare global {
    namespace NodeJS {
        interface Global {
            client?:PrismaClient
        }
    }
 }
