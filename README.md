# redash_render
We have two sections in this repository. One is docker compose to help lauch a redash system. And another hand is a docker render png image from redash's queries url.

Currently, redash has not supported an api to generate image/pdf file. Docker render will help us create an image from a redash url and push it to us slack channel on schedule.

## I. Redash
  1. Make sure you have a Docker machine up and running.
  2. Make sure your current working directory is `redash` of this GitHub repository.
  3. Use the `.env` configuration and modify `CHANGE_ME` values by your values as needed. 
  ```
      DATABASE_PASSWORD=CHANGE_ME
      COOKIE_SECRET=CHANGE_ME
      PORT_EXPOSE=CHANGE_ME
  ```
  4. The Postgres volume location is persistent in `data/postgres-data/`directory.
  5. Run `docker-compose -f docker-compose.yml run --rm server create_db` to setup the database.
  6. Run `docker-compose -f docker-compose.yml up` to start all of redash components
  7. Redash should be available on `PORT_EXPOSE` port, of the host machine.

## II. Docker Render
  
  By default, the image reports will be sent to slack channel at **12PM and 6PM** everyday when your container run correctly.
  ### How to run docker render:
  
   1. Go to `render` directory.
   2. Modify `CHANGE_ME` values by your values in config.json file
   3. Run `docker build -t redash_render .`
   3. Run `docker run -d redash_render`
   
  ### How to get queries id:
  The query id is last character numeric value after `/queries/` in your url in the redash dashboard
  
  #### Example:
  If your query uri is `http://localhost/queries/1#3`, queries id is `1#3`
