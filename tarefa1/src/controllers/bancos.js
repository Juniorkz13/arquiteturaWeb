module.exports.index = function (app, req, res) {
    var bancosModel = new app.src.models.bancos()
    bancosModel.getBancos(function (error, result) {
        res.render('bancos/index', { bancos: result })
    })
}
