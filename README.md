# Udagram Image Filtering Microservice

## FullStack Apps On AWS

Udagram is a simple cloud application developed alongside the Udacity Cloud Engineering Nanodegree. It allows users to register and log into a web client, post photos to the feed, and process photos using an image filtering microservice.

This submission is for deploying a simple image filtering service using AWS [ElasticBeanStalk](https://aws.amazon.com/fr/elasticbeanstalk/) service.

The starter code is available below:
[The Image Filtering Microservice](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code)

## Tasks

### Setup Node Environment

You'll need to create a new node server. Open a new terminal within the project directory and run:

1. Initialize a new project: `npm i`
2. run the development server with `npm run dev`

### Create a new endpoint in the server.ts file

The starter code has a task for you to complete an endpoint in `./src/server.ts` which uses query parameter to download an image from a public URL, filter the image, and return the result.

We've included a few helper functions to handle some of these concepts and we're importing it for you at the top of the `./src/server.ts` file.

```typescript
import { filterImageFromURL, deleteLocalFiles } from "./util/util";
```

### Deploying your system

Follow the process described in the course to `eb init` a new application and `eb create` a new environment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.

## USAGE

### REQUEST JWT TOKEN

In order to do a request for image filtering, you need to be authenticated using a JWT token.

1. A token can be requested using a post request the api `/token` with a body (ex: `{"name": "YOUR_NAME"}`)
2. Copy `token` field from the response
3. Use this key in your request example `Bearer [TOKEN]`. Replace `[TOKEN]` with the one you copied previously.
4. A request parameter `image_url` with the value, the url of the image to filter.
   `GET /filteredimage?image_url={{URL}}`

Some screenshots are available inside `deployment_screenshot` folder
