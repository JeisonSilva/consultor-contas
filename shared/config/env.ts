import "dotenv/config";

const CONFIG = {
    OPEN_LLM_KEY: process.env.OPEN_LLM_KEY,
    MODEL: process.env.MODEL,
    TEMPERATURE: process.env.TEMPERATURE,
    PATH_MEMORY: process.env.PATH_MEMORY,
    BASE_URL: process.env.BASE_URL,
}

export default CONFIG;