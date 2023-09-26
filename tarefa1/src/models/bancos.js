var fs = require('fs')

function bancos() {}

bancos.prototype.getBancos = function (callback) {
    fs.readFile('./data/bancos.json', 'utf8', function (error, result) {
        const parsedData = JSON.parse(result)
        callback(error, parsedData.bancos)
    })
}

module.exports = function () {
    return bancos
}
