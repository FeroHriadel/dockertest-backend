# DOCKER TEST - BACKEND
This is my Docker Test backend. 


### LOCAL DEVELOPMENT DB (for development only):
- this is inteded for local development only. In production backend will connect to AWS RDS instead.
- Start Docker Desktop:
- run this docker-compose file:

```
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    container_name: dev-mysql
    ports:
      - "3306:3306" # Exposes MySQL on localhost:3306
    environment:
      MYSQL_ROOT_PASSWORD: root_password # Set the root password
      MYSQL_DATABASE: dev_db             # Create a default database
      MYSQL_USER: dev_user               # Create a user
      MYSQL_PASSWORD: dev_password       # Set the user's password
    volumes:
      - mysql_data:/var/lib/mysql # Attach the named volume for persistent storage
    networks: # network is optional, chat gpt says this is for code organization purposes
      - dev-network

volumes:
  mysql_data: # you have to declare all named volumes here

networks:
  dev-network:
    driver: bridge



# run this by: $ docker-compose up -d (-d = run in detached mode)
# remove by: $ docker-compose down -v (-v = delete volumes too)
```

- run and remove like this:

```
# run this by: $ docker-compose up -d (-d = run in detached mode)
# remove by: $ docker-compose down -v (-v = delete volumes too)
```


### LOCAL DEVELOPMENT .env
- create .dotenv in the root:

```
NODE_ENV = dev
PORT = 80

DB_HOST = '127.0.0.1'
DB_PORT = 3306
DB_USER = dev_user
DB_PASSWORD = dev_password
DB_DATABASE = dev_db
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
```


### LOGGING
- the app logs to AWS CloudWatch (note for me: the yahoo account)
- create a user in AWS IAM and attach these privileges to them:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "*"
    }
  ]
}
```

- make sure these are included in .env:

```
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=your-region
```

- the logging code is in `/src/logs/logs.ts`
- use CloudWatchLogger like this:

```
import { logToCloudWatch } from "./logs/logs";
await logToCloudWatch('Your message');
```


### REPO
- push to github


