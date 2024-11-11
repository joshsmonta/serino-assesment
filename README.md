# Kitra API

This is the Kitra API project, which allows users to collect treasures and manage their scores.

## Getting Started

NOTE: environment variables are hard-coded only for convenience of the assessment, for plug-and-play purposes. Usually, I use docker secrets or k8s secrets when deploying on a containerized environment.

To set up and run the project, follow these steps:

### Prerequisites

- Make sure you have [MySQL](https://dev.mysql.com/downloads/installer/) and [NodeJS](https://nodejs.org/en/download/package-manager) installed on your machine.
  Configure MYSQL properly after installation and add it to your PATH environment.

After installation of mysql, login using your configured credentials and create a database called `kitra`:

```bash
mysql -u {your-username} -p
mysql> CREATE DATABASE kitra;
```

Create a `.env` file to the folder and add your connection URI so that the app could access the database.

```bash
MYSQL_CONNECTION_URI="mysql://{your_username}:{your_password}@127.0.0.1:3306/kitra"
```

- (Optional) Ensure you have [Docker](https://www.docker.com/) installed on your machine.
- (Optional) Make sure you have [Docker Compose](https://docs.docker.com/compose/) installed.

### Running the Application

NOTE: you can run the application locally or via docker compose.

**Option A: Running Locally**

If you've already installed MySQL and created a database for `kitra`, then you could run the project locally by running this command:

```bash
npm start
```

**Option B: Running docker containers**

Open your terminal and navigate to the project directory. Run the following command to build the Docker containers:

```bash
docker-compose build
docker-compose up -d
```

**Run Migrations**

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

### Database Access

You can access the database and monitor it with [MYSQL workbench](https://dev.mysql.com/downloads/workbench/).

(Optional) if you successfully deployed the docker compose without any issues, then you can access the phpmyadmin webpage via this link:

```bash
localhost:8080
```

### (Optional) Run Unit Test

The unit tests only works when you have docker installed because the test creates and destroys it's own database after the tests are finish.

```bash
npm test
```

### API Documentation

check the API docs here:

(https://www.postman.com/aviation-candidate-11069076/public-workspace/request/qus42e9/grab-treasure-and-update-user-total)
