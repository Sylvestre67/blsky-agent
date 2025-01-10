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
