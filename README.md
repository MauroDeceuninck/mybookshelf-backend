# MyBookshelf Backend

This is the Node.js + Express backend for the MyBookshelf application. It provides user authentication and book management APIs.

## Prerequisites

- Node.js (v14+)
- npm
- MongoDB (local or MongoDB Atlas)
- Docker & Docker Compose (optional)

## Installation

```bash
git clone https://github.com/MauroDeceuninck/mybookshelf-backend.git
cd mybookshelf-backend
npm install
```

## Environment Setup

Create a `.env` file in the root:

```env
MONGODB_URI=your-MongoDB-connection-string
JWT_SECRET=your-very-secret-key
```

## Running Locally

Make sure MongoDB is running, then:

```bash
npm start
```

API available at: [http://localhost:3000/api](http://localhost:3000/api)

## Docker Deployment

### Build and run the image:

```bash
# Build the backend image
docker build -t mybookshelf-backend ./mybookshelf-backend

# Run the backend container with environment variables
docker run -d \
  --name mybookshelf-backend \
  -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/mybookshelf?retryWrites=true&w=majority&appName=Cluster0" \
  -e JWT_SECRET="your-secret-key" \
  mybookshelf-backend

```

### Or use Docker Compose:

```yaml
version: "3"

services:
  backend:
    build:
        context: ./mybookshelf-backend
    # image: maurodeceuninck/mybookshelf-backend:latest
    ports:
      - "3000:3000"
    environment:
      MONGODB_URI: "mongodb+srv://<username>:<password>@cluster.mongodb.net/mybookshelf?retryWrites=true&w=majority&appName=Cluster0"
      JWT_SECRET: "your-secret-key"

  frontend:
    build:
        context: ./mybookshelf-frontend
    # image: maurodeceuninck/mybookshelf-frontend:latest
    ports:
      - "3001:80"
    volumes:
      - ./frontend-config/config.json:/usr/share/nginx/html/runtime-config/config.json

    depends_on:
      - backend
``` 

or use the publicly available images: 

```bash
maurodeceuninck/mybookshelf-frontend:latest
maurodeceuninck/mybookshelf-backend:latest
```

Make sure to create the `config.json` file (adjust the URL if needed):

```json
{
  "API_URL": "http://localhost:3000"
}
```

Or my domain if the publicly available images are used:

```json
{
  "API_URL": "https://mybookshelf.mauroserver.com"
}
```

Then start with:

```bash
docker compose up --build
```

## Security

* Passwords are hashed using `bcrypt`
* Authentication is handled using `JWT` tokens
