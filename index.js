app.get('/image', async (req, res) => {
  try {
    const imgFilename = req.query.imgfilename; // Get the query string parameter
    if (!imgFilename) {
      return res.status(400).send('Missing imgfilename parameter');
    }

    const externalApiUrl = `https://43.229.78.113:8300/uploads/${imgFilename}`; // Construct URL with parameter

    const response = await axios.get(externalApiUrl, {
      responseType: 'arraybuffer',
    });
    const imageData = Buffer.from(response.data, 'binary');

    res.contentType('image/jpeg'); // Adjust the content type as needed
    res.send(imageData);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Failed to fetch image');
  }
});