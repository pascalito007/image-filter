import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";
import { generateJWT, requireAuth } from "./auth-utils";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  app.get(
    "/filteredimage",
    requireAuth,
    async (req: Request, res: Response) => {
      let { image_url }: { image_url: string } = req.query;
      if (!image_url) {
        res.status(400).send({ message: "Invalid Image url" });
      }
      let pathToImage = await filterImageFromURL(image_url);
      console.log(pathToImage);
      res.status(200).sendFile(pathToImage, () => {
        deleteLocalFiles([pathToImage]);
      });
    }
  );

  // POST request to retrieve jwt token
  // body : {name: string};
  app.post("/token", async (req: Request, res: Response) => {
    const { name } = req.body;
    // check the name is valid
    if (!name) {
      return res.status(400).send({ auth: false, message: "Name is required" });
    }
    // Generate JWT
    const jwt = generateJWT({ name });

    res.status(200).send({ auth: true, token: jwt, name });
  });

  /**************************************************************************** */

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
