import AWS from 'aws-sdk'

const rekognition = new AWS.Rekognition()

export default class ImageAnalyser {
  static async recognizeImage(s3Config) {
    const params = {
      Image: {
        S3Object: {
          Bucket: s3Config.bucket,
          Name: s3Config.imageName,
        },
      },
    }
    console.log(`Analyzing file: https://s3.amazonaws.com/${s3Config.bucket}/${s3Config.imageName}`)
    //  try {
    //    const data = await rekognition.detectLabels(params).promise();
    //    console.log(JSON.stringify(data.Labels))
    //  } catch (err) {
    // console.log(err); // eslint-disable-line
    // console.log('Cannot recognize image'); // eslint-disable-line
    //  }


    const result = {}
    try {
      const [
        labelsData,
        moderationData,
        textData,
      ] =
        await Promise.all([
          rekognition.detectLabels(params).promise(),
          rekognition.detectModerationLabels(params).promise(),
          rekognition.detectText(params).promise(),
        ]);


      result.Labels = labelsData.Labels
      // console.log(JSON.stringify(labelsData))

      result.ModerationLabels = moderationData.ModerationLabels
      // console.log(JSON.stringify(moderationData))

      result.TextDetections = textData.TextDetections
      // console.log(JSON.stringify(textData))
    } catch (err) {
      console.log('Error parsing image')
      console.log(err)
      return null
    }
    return result
  }
}
