import * as L from 'leaflet';
import {Observable} from 'rxjs';

declare module 'leaflet' {
  namespace TileLayer {
    export class WMSHeader extends WMS {
      constructor(
        baseUrl: string,
        options: WMSOptions,
        header: { header: string; value: string }[],
        abort?: Observable<any>
      );
    }
    export function wmsHeader(
      baseUrl: string,
      options: WMSOptions,
      header: { header: string; value: string }[],
      abort?: Observable<any>
    ): L.TileLayer.WMSHeader;
    export class TileLayerHeader extends TileLayer {
      constructor(
        baseUrl: string,
        options: TileLayerOptions,
        header: { header: string; value: string }[],
        abort?: Observable<any>
      );
    }
    export function Header(
      baseUrl: string,
      options: TileLayerOptions,
      header: { header: string; value: string }[],
      abort?: Observable<any>
    ): L.TileLayer.TileLayerHeader;
  }
}
