import type { SourceSpecification } from "maplibre-gl";

export const MAP_CONFIG = {
    center: [24.75, 58.6] as [number, number],
    zoom: 7 as number,
    dragPan: false,
    keyboard: false,
    scrollZoom: false,
    doubleClickZoom : false,
    zoomPaddingMultiplier : 0.1,
    zoomAnimation : {
        duration: 800,
        zoom    : 8.5,
        curve   : 1,
        speed   : 0.6
    },
    sources : {
        basemap : {
            id      : 'cartoBaseMap',
            data    : {
                type    : 'raster',
                tiles   : ['https://a.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'],
                tileSize: 256,
                maxzoom : 8,
            } as SourceSpecification
        },
        counties : {
            id      : 'countyLayerSource',
            path    : '/data/county-lines.geojson',
            data    : {
                type    : 'geojson',
                data    : '/data/county-lines.geojson',
                promoteId: 'MKOOD',
            } as SourceSpecification
        }
    },
    layers : {
        basemap : {
            id      : 'basemap',
            type    : 'raster',
            source  : 'cartoBaseMap'
        } as const,
        countyLines : {
            id      : 'countyLines',
            type    : 'line',
            source  : 'countyLayerSource',
            paint   : {
                'line-color'    : ['case', ['boolean', ['feature-state', 'hover'], false], '#bdbdbd', '#333'],
                'line-width'    : 1,
            }
        },
        countyFill : {
            id      : 'countyFill',
            type    : 'fill',
            source  : 'countyLayerSource',
            paint   : {
                'fill-color' : [
                    'case',
                    ['boolean', ['feature-state', 'selected'], false], 'transparent',
                    'transparent'
                ]
            }
        },
        countyFillHover : {
            id      : 'countyFillHover',
            type    : 'fill-extrusion',
            source  : 'countyLayerSource',
            layout  : {
                'fill-extrusion-rounded-corner-distance' : 2,
            },
            paint   : {
                'fill-extrusion-color'  : '#0f572f',
                'fill-extrusion-height' : 10000,
                'fill-extrusion-opacity': 0.5
            }
        },
        countyDim   : {
            id      : 'countyDim',
            type    : 'fill',
            source  : 'countyLayerSource',
            paint   : {
                'fill-color' : 'rgba(0,0,0,0.3)',
                'fill-opacity': 0,
                'fill-opacity-transition': { duration : 300}
            }
        }
    }
}