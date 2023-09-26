module.exports = function (app) {
    app.get('/', (req, res) => {
        app.src.controllers.bancos.index(app, req, res)
    })
}
