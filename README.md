# Kitra API

This is the Kitra API project, which allows users to collect treasures and manage their scores.

## Getting Started

NOTE: environment variables are hard-coded only for convenience of the assessment, for plug-and-play purposes. Usually, I use docker secrets or k8s secrets when deploying on a containerized environment.

To set up and run the project, follow these steps:

### Prerequisites

- Ensure you have [Docker](https://www.docker.com/) installed on your machine.
- Make sure you have [Docker Compose](https://docs.docker.com/compose/) installed.

### Running the Application

1. **Build the Docker Containers**

   Open your terminal and navigate to the project directory. Run the following command to build the Docker containers:

   ```bash
   docker-compose build
   docker-compose up -d
   ```

2. **Run Migrations**

Using the Migrate Endpoint
Once the application is running, you need to execute the initial migrations to set up the database schema. Follow these steps:

Use a tool like Postman or cURL to make the request.

Set the request method to POST.

Use the following URL:

```bash
http://127.0.0.1:3000/migrate
```

In the request body, set the Content-Type to application/json and provide the following JSON payload:

```json
{
  "migrate_type": "up" // Use "down" if you want to roll back migrations
}
```

Send the request. This will execute the necessary migrations to create the required database tables and seed them with initial data.

### API Documentation

check the API docs here:

(https://www.postman.com/aviation-candidate-11069076/public-workspace/request/qus42e9/grab-treasure-and-update-user-total)
