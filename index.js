'use strict';

async function fetchImage(url, callback, headers, abort) {
  console.log("fetching image  : " + url);
  let _headers = {};
  if (headers) {
    headers.forEach(h => {
      _headers[h.header] = h.value;
    });
  }
  const controller = new AbortController();
  const signal = controller.signal;
  if (abort) {
    abort.subscribe(() => {
      controller.abort();
    });
  }
  const f = await fetch(url, {
    method: "GET",
    headers: _headers,
    mode: "cors",
    signal: signal
  });
  const blob = await f.blob();
  callback(blob);
}

L.TileLayer.WMSHeader = L.TileLayer.WMS.extend({
  initialize: function (url, options, headers, abort) {
    L.TileLayer.WMS.prototype.initialize.call(this, url, options);
    this.headers = headers;
    this.abort = abort;
  },
  createTile(coords, done) {
    const url = this.getTileUrl(coords);
    const img = document.createElement("img");
    img.setAttribute("role", "presentation");

    fetchImage(
      url,
      resp => {
        const reader = new FileReader();
        reader.onload = () => {
          img.src = reader.result;
        };
        reader.readAsDataURL(resp);
        done(null, img);
      },
      this.headers,
      this.abort
    );
    return img;
  }
});

L.TileLayer.wmsHeader = function (url, options, headers, abort) {
  return new L.TileLayer.WMSHeader(url, options, headers, abort);
};

L.TileLayer.TileLayerHeader = L.TileLayer.extend({
  initialize: function (url, options, headers, abort) {
    L.TileLayer.prototype.initialize.call(this, url, options);
    this.headers = headers;
    this.abort = abort;
  },
  createTile(coords, done) {
    const url = this.getTileUrl(coords);
    console.log("URL : " + url);
		var tile = document.createElement('img');

		if (this.options.crossOrigin || this.options.crossOrigin === '') {
			tile.crossOrigin = this.options.crossOrigin === true ? '' : this.options.crossOrigin;
		}
    tile.setAttribute("role", "presentation");

    fetchImage(
      url,
      resp => {
        const reader = new FileReader();
        reader.onload = () => {
          tile.src = reader.result;
        };
        reader.readAsDataURL(resp);
        done(null, tile);
      },
      this.headers,
      this.abort
    );
    return tile;
  }
});

L.TileLayer.tileLayerHeader = function (url, options, headers, abort) {
  return new L.TileLayer.TileLayerHeader(url, options, headers, abort);
};