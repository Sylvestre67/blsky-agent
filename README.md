# BlueSky Popular Topic Agent

See [sylwebz](https://bsky.app/profile/sylwebz.bsky.social) profile for samples.

## Running the Notebook with Docker

To run the notebook using Docker, follow these steps:

1. Ensure you have Docker installed and up and running on your machine.
```sh
docker --version
```

If Docker is not installed, follow the instructions at [Docker Installation Guide](https://docs.docker.com/engine/install/).

2. Navigate to the project directory.

3. Create a `.env` file with the necessary environment variables (e.g., `BLSKY_USERNAME`, `BLSKY_PASSWORD`, `OPENAI_API_KEY`, etc.). You can refer to the `.env.example` file for the required variables and their format.

4. Use the following command to start the Docker container:
```sh
docker compose up
```

5. Open your browser and navigate to [blsky-agent.ipynb](http://127.0.0.1:8888/lab/tree/work/blsky-agent.ipynb) to access the Jupyter Notebook interface.

6. Open the `blsky-agent.ipynb` notebook and run the cells.

Enjoy !

## Running the Remix Application

To run the Remix application, follow these steps:

1. Ensure you have Node.js and npm installed on your machine.
```sh
node --version
npm --version
```

If Node.js and npm are not installed, follow the instructions at [Node.js Installation Guide](https://nodejs.org/en/download/).

2. Navigate to the `client` directory.
```sh
cd client
```

3. Install the necessary dependencies.
```sh
npm install
```

4. Create a `.env` file with the necessary environment variables (e.g., `API_BASE_URL`). You can refer to the `.env.example` file for the required variables and their format.

5. Use the following command to start the Remix development server:
```sh
npm run dev
```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Remix application.

Enjoy !

## Running the Express Server

To run the Express server, follow these steps:

1. Ensure you have Node.js and npm installed on your machine.
```sh
node --version
npm --version
```

If Node.js and npm are not installed, follow the instructions at [Node.js Installation Guide](https://nodejs.org/en/download/).

2. Navigate to the `server` directory.
```sh
cd server
```

3. Install the necessary dependencies.
```sh
npm install
```

4. Create a `.env` file with the necessary environment variables (e.g., `BLSKY_USERNAME`, `BLSKY_PASSWORD`). You can refer to the `.env.example` file for the required variables and their format.

5. Use the following command to start the Express server:
```sh
npm run dev
```

6. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to access the Express server.

Enjoy !
