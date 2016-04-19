module.exports = function (router) {
    router.get('/visualstudio/callback', function* (next) {
        console.log(this.query);
        this.body = JSON.stringify(this.query, null, 2);
    })
}