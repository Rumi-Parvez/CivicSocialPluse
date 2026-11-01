import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const client = new MongoClient(`${process.env.MONGOBD_CLIENT_URL}`);
const db = client.db('CivicSocialPluse-DB');

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
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


    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },

    plugins: [jwt()],

});