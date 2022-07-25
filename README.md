# File Upload demo

## Env Vars Required

```bash
S3_BUCKET_NAME='<some name>'
REGION='<some region>'
```

## How it works

- Multer <> allows local file upload.
- AWS control comes with `@aws-sdk` (an SDK is a 'Software Development Kit' - like templates for best practice usage)
- We use the S3 client (`client-s3`) part to write our files to S3 buckets.

If you look in `upload.js` you can see us create a system which, depending on if a `S3_BUCKET_NAME` is provided. We create and create multer middleware. We then use that in our routes, e.g. `/routes/artists.js`

```javascript
const upload = require("./../upload"); // Where we create the middleware

router.post("/", upload.array("photos", 30), addArtist);
//               ^^ Where we use it
```
