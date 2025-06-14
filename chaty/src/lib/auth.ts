import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema  from "@/db/schema"; // your schema
 
export const auth = betterAuth({
    // Authentication method
     emailAndPassword: {  
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: "pg", // "PostgreSQL" 
        schema: { ...schema }, // your schema
    })
});