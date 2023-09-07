
function handleRawStream(stream, callback) {
  const buffers = []
  stream.on('data', function(chunk) {
    buffers.push(chunk)
  })

  stream.on('end', function() {
    callback(Buffer.concat(buffers));
  });
}

module.exports = handleRawStream