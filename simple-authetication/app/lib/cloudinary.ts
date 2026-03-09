import { v2 as cloudinary } from 'cloudinary'


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const uploadImage = async (file: Blob | null): Promise<string | null> => {
  if (!file) {
    return null
  }
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return new Promise((resolve, reject) => {
      const upload_stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto"
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result?.secure_url ?? null)
        }
      )
      upload_stream.end(buffer);
    })
  } catch (error) {
    console.log(error);
    return null
  }
}

export default uploadImage;