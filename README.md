# Reunion Backend App
This repo contains all the required code for the Reunion Backend Assignment, covering all the mentioned endpoints.

## Endpoints Covered
- [X] POST /authenticate
- [X] GET /user
- [X] POST /follow/:userId
- [X] POST /unfollow/:userId
- [X] POST /posts
- [X] DELETE /posts/:postId
- [X] POST /like/:postId
- [X] POST /unlike/:postId
- [X] POST /comment/:postId
- [X] GET /all_posts
- [X] GET /posts/:postId

## How to Run the App?
The App is encapsulated into a Docker Image, making it much simpler to run. However, you will need the `.env` file for the Secret variables. Please send me an email for the same.

```
# MongoDB Connection URI
MONGO_URI=mongodb+srv://<username>:<passrord>@<cluster>/reunion?retryWrites=true&w=majority

# PORT to run the server on
PORT=8000

# JWT
JWT_SECRET=<your_jwt_secret>
```

Once you are ready, and ofcourse have Docker installed, go to the Root directory and run `docker-compose up` and the app should be accessible at `http://localhost:8000`

## Testing the App
```bash
npm run test
```