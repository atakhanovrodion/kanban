declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGO_URL: string;
			PORT: string;
			JWT_SECRET_KEY: string;
		}
	}
}
export {};
