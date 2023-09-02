const handleRawStream = require('./main.js');
const assert = require('assert');
const path = require('path')
const fs = require('fs')


const file = path.join(__dirname, 'a.json')
const length = fs.statSync(file).size
const string = fs.readFileSync(file, 'utf8')

console.log('JSON parse:>> ', JSON.parse(fs.readFileSync(file)));
function createStream() {
  return fs.createReadStream(file)
}

describe('handleRawStream', function () {
  it('should work', function (done) {
    handleRawStream(createStream(), function (buf) {
      console.log('buf :>> ', JSON.parse(buf));
      assert.ok(Buffer.isBuffer(buf))
      assert.equal(buf.length, length)
      assert.strictEqual(buf.toString('utf8'), string)
      done()
    })
  })
});