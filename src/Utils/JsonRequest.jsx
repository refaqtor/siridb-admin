class JsonRequest {

    constructor(type, url, data, isStringified) {

        this.doneCb = function (data) { };
        this.failCb = function (error, data) {
            console.error(error, data);
        };
        this.alwaysCb = function (xhr, data) { };

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open(type, url);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send((data === undefined || isStringified) ? data : JSON.stringify(data));

        xmlhttp.onload = function (e) {
            console.log(e);
            console.log(xmlhttp.responseText);
        };

        // d3.request(url)
        //     .header('Content-Type', 'application/json')
        //     .on('error', (error) => {
        //         let data = this._onResponse(error.target);
        //         this.failCb(error.target, data);
        //     })
        //     .on('load', (xhr) => {
        //         let data = this._onResponse(xhr);
        //         this.doneCb(data);
        //     })
        //     .send(type, (data === undefined || isStringified) ?
        //         data : JSON.stringify(data));
    }

    _onResponse(xhr) {
        let data = JSON.parse(xhr.responseText);
        this.alwaysCb(xhr, data);
        return data;
    }

    done(doneCb) {
        this.doneCb = doneCb;
        return this;
    }

    fail(failCb) {
        this.failCb = failCb;
        return this;
    }

    always(alwaysCb) {
        this.alwaysCb = alwaysCb;
        return this;
    }
}

export default JsonRequest;