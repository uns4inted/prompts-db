# promtsDB
This is full stack application created with the Next.js 13 framework.
The application is a database for sharing and discovering prompts for the AI platforms.

User can authorize using Google OAuth 2.0 to add new posts.

Visit the app at: [https://prompts-db.vercel.app/](https://prompts-db.vercel.app/).<br>
Using Vercel for deployment.

## Source code usage:

To run the development server use:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Environment variables:

The app is using environment variables, so for local usage you need to create `.env` file with following content or add the variables to your remote environment.

**Dont forget to replace `<placeholders>` with your real data.**
  
```.env
# Google Auth:
# Setting up OAuth 2.0: https://support.google.com/cloud/answer/6158849
# Remember to configure Authorized JavaScript origins and Authorized redirect URIs in your Google Cloud Console.
GOOGLE_CLIENT_ID=<your_client_id>
GOOGLE_CLIENT_SECRET=<your_client_secret>

# MongoDB:
# Generate your unique mongo db URI in format below.
MONGODB_URI=mongodb+srv://<login>:<password>@<your-cluster>.<selected-server>.mongodb.net/?retryWrites=true&w=majority

# More in docs: https://www.mongodb.com/docs/atlas/getting-started/

# Next Auth Secrets:
# For local runs use following URLs, but for the remote deployment - replace them with your domain name.

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
NEXTAUTH_SECRET=somErAndOmStRiNGiNtHisForMat+uh86E=

# Secret is randomly generated string, see docs on how to get one: https://next-auth.js.org/configuration/options#secret
```
#### Google OAuth 2.0, Authorized JavaScript origins and Authorized redirect URIs:
![image w:200](https://github.com/uns4inted/prompts-db/assets/46504720/6d889bfd-93dd-4cfb-8c1f-842b7ad75a75)
