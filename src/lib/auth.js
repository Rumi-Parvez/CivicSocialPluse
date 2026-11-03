import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(`${process.env.MONGODB_CLIENT_URL}`);
const db = client.db('CivicSocialPluse-DB');

export const auth = betterAuth({
  trustedOrigins: [process.env.BETTER_AUTH_URL ,
    "http://localhost:3000"],
    emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID , 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET , 
        }, 
    },

  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
        input: true, 
      },
    },
  },
  

  database: mongodbAdapter(db, {
    client,
  }),


    

    plugins: [jwt()],

});