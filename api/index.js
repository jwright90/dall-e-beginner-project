import * as dotenv from 'dotenv';
import express, { response } from 'express';
import cors from 'cors';

dotenv.config();

import {Configuration, OpenAIApi} from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI,
});

const openai = new OpenAIApi(configuration);

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate', async(req, res) => {

    try {
        const prompt = req.body.prompt;

        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
        });

        const image = aiResponse.data.data[0].url;
        res.send({ image });
    } catch (error) {
        console.log(error)
        res.status(500).send(error?.response.data.error.message || 'Something went wrong...');
    }
});

app.listen(port, () => console.log(`[server]: Server is running at http://localhost:${port}`));

