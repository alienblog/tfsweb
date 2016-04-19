module.exports = function (router) {
    router.get('/visualstudio/callback', function* (next) {
        if (this.query)
            this.session.identity = this.query.raw || {};
        this.body = JSON.stringify(this.query, null, 2);
    })

    router.get('/getUser', function* (next) {
        var result = {};
        if (this.session.identity) {
            result.data = this.session.identity;
        } else {
            result.error = 1
        }
        this.body = JSON.stringify(result);
    })
}