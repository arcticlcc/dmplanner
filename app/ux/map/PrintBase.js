/*
 * Base layer for map printing.
 * Borrowed from: https://github.com/mikefowler/smallworld.js/blob/2f813ef291d6d2f89e1cc4bcc027ffc33b2a4bff/dist/world.json
 * LICENSE: https://github.com/mikefowler/smallworld.js/blob/2f813ef291d6d2f89e1cc4bcc027ffc33b2a4bff/LICENSE
 */
Ext.define('DMPlanner.ux.map.PrintBase', {
    singleton: true,

    json: {
        "type": "FeatureCollection",

        "features": [{
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-59.6, -80.0], [-60.2, -81.0], [-64.5, -80.9], [-66.3, -80.3], [-61.9, -80.4], [-60.6, -79.6], [-59.6, -80.0]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-159.2, -79.5], [-161.1, -79.6], [-163.7, -78.6], [-161.2, -78.4], [-159.2, -79.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-45.2, -78.0], [-43.9, -78.5], [-43.3, -80.0], [-50.5, -81.0], [-54.2, -80.6], [-51.0, -79.6], [-48.7, -78.0], [-45.2, -78.0]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-121.2, -73.5], [-119.9, -73.7], [-118.7, -73.5], [-120.2, -74.1], [-122.6, -73.7], [-121.2, -73.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-125.6, -73.5], [-124.0, -73.9], [-127.3, -73.5], [-126.6, -73.2], [-125.6, -73.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-99.0, -71.9], [-96.8, -72.0], [-96.2, -72.5], [-100.8, -72.5], [-102.3, -71.9], [-99.0, -71.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-68.5, -71.0], [-68.8, -72.2], [-71.1, -72.5], [-74.2, -72.4], [-75.0, -71.7], [-72.1, -71.2], [-71.7, -69.5], [-70.3, -68.9], [-68.5, -71.0]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-58.6, -64.2], [-62.0, -64.8], [-62.6, -65.5], [-62.1, -66.2], [-63.7, -66.5], [-65.7, -68.0], [-63.2, -69.2], [-61.8, -70.7], [-60.8, -73.7], [-64.4, -75.3], [-70.6, -76.6], [-77.2, -76.7], [-73.7, -77.9], [-77.9, -78.4], [-78.0, -79.2], [-75.4, -80.3], [-59.7, -82.4], [-58.2, -83.2], [-49.8, -81.7], [-42.8, -82.1], [-40.8, -81.4], [-28.5, -80.3], [-29.7, -79.3], [-35.6, -79.5], [-35.8, -78.3], [-28.9, -76.7], [-17.5, -75.1], [-15.7, -74.5], [-15.4, -74.1], [-16.5, -73.9], [-15.4, -73.1], [-10.3, -71.3], [-7.4, -71.7], [-6.9, -70.9], [-0.2, -71.6], [7.7, -69.9], [9.5, -70.0], [10.8, -70.8], [13.4, -70.0], [27.1, -70.5], [32.0, -69.7], [33.9, -68.5], [38.6, -69.8], [54.5, -65.8], [61.4, -68.0], [64.1, -67.4], [68.9, -67.9], [69.7, -69.2], [67.8, -70.3], [69.1, -70.7], [67.9, -71.9], [69.9, -72.3], [71.0, -72.1], [73.9, -69.9], [77.6, -69.5], [79.1, -68.3], [82.8, -67.2], [86.8, -67.2], [88.0, -66.2], [89.7, -67.2], [95.8, -67.4], [99.7, -67.2], [102.8, -65.6], [106.2, -66.9], [113.6, -65.9], [119.8, -67.3], [123.2, -66.5], [128.8, -66.8], [134.8, -66.2], [135.1, -65.3], [137.5, -67.0], [145.5, -66.9], [146.6, -67.9], [148.8, -68.4], [154.3, -68.6], [161.6, -70.6], [167.3, -70.8], [171.2, -71.7], [169.3, -73.7], [166.1, -74.4], [163.6, -76.2], [163.5, -77.1], [164.7, -78.2], [167.0, -78.8], [161.8, -79.2], [159.8, -80.9], [169.4, -83.8], [180.0, -84.7], [180.0, -90.0], [-180.0, -90.0], [-180.0, -84.7], [-179.1, -84.1], [-174.4, -84.5], [-170.0, -83.9], [-158.1, -85.4], [-148.5, -85.6], [-143.1, -85.0], [-142.9, -84.6], [-153.6, -83.7], [-152.9, -82.0], [-156.8, -81.1], [-150.6, -81.3], [-146.4, -80.3], [-149.5, -79.4], [-155.3, -79.1], [-158.1, -78.0], [-158.4, -76.9], [-151.3, -77.4], [-146.1, -76.5], [-146.2, -75.4], [-135.2, -74.3], [-121.1, -74.5], [-113.9, -73.7], [-112.3, -74.7], [-107.6, -75.2], [-100.6, -75.3], [-100.1, -74.9], [-102.5, -74.1], [-103.7, -72.6], [-96.3, -73.6], [-90.1, -73.3], [-89.2, -72.6], [-81.5, -73.9], [-80.3, -73.1], [-74.9, -73.9], [-67.4, -72.5], [-67.3, -71.6], [-68.5, -69.7], [-67.4, -68.1], [-67.7, -67.3], [-63.0, -64.6], [-57.2, -63.5], [-58.6, -64.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-67.7, -53.9], [-65.0, -54.7], [-65.5, -55.2], [-67.0, -54.9], [-69.2, -55.5], [-72.3, -54.5], [-74.7, -52.8], [-71.1, -54.1], [-69.3, -52.5], [-67.7, -53.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-58.6, -51.1], [-57.7, -51.6], [-58.0, -51.9], [-60.7, -52.3], [-61.2, -51.9], [-58.6, -51.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[70.3, -49.7], [68.7, -49.8], [68.9, -48.6], [70.5, -49.1], [70.3, -49.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[145.4, -40.8], [148.3, -40.9], [147.9, -43.2], [146.0, -43.5], [144.7, -41.2], [145.4, -40.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[173.0, -40.9], [174.2, -41.3], [172.7, -43.4], [173.1, -43.9], [171.5, -44.2], [170.6, -45.9], [169.3, -46.6], [166.7, -46.2], [167.0, -45.1], [170.5, -43.0], [172.1, -41.0], [172.8, -40.5], [173.0, -40.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[174.6, -36.2], [176.8, -37.9], [178.5, -37.7], [178.0, -39.2], [177.2, -39.1], [175.2, -41.7], [174.7, -41.3], [175.2, -40.5], [174.9, -39.9], [173.8, -39.5], [174.6, -38.8], [174.7, -37.4], [172.6, -34.5], [174.3, -35.3], [174.6, -36.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[167.1, -22.2], [165.5, -21.7], [164.0, -20.1], [165.0, -20.5], [167.1, -22.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[178.4, -17.3], [178.6, -18.2], [177.4, -18.2], [177.7, -17.4], [178.4, -17.3]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[179.4, -16.8], [178.6, -16.6], [180.0, -16.1], [180.0, -16.6], [179.4, -16.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-179.9, -16.5], [-180.0, -16.1], [-179.8, -16.0], [-179.9, -16.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[167.8, -16.5], [167.5, -16.6], [167.2, -15.9], [167.8, -16.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[167.1, -14.9], [167.3, -15.7], [166.6, -14.6], [167.1, -14.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[50.1, -13.6], [50.4, -15.7], [49.7, -15.7], [49.8, -16.9], [47.1, -24.9], [45.4, -25.6], [44.0, -25.0], [43.3, -22.1], [44.4, -20.1], [44.0, -17.4], [44.4, -16.2], [46.3, -15.8], [47.7, -14.6], [49.2, -12.0], [50.1, -13.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[143.6, -13.8], [143.9, -14.5], [144.6, -14.2], [145.4, -15.0], [146.4, -19.0], [148.8, -20.4], [149.7, -22.3], [150.7, -22.4], [150.9, -23.5], [153.1, -26.1], [153.6, -28.1], [152.9, -31.6], [150.3, -35.7], [150.0, -37.4], [146.3, -39.0], [144.9, -38.4], [145.0, -37.9], [143.6, -38.8], [140.6, -38.0], [139.6, -36.1], [138.1, -35.6], [138.2, -34.4], [136.8, -35.3], [137.8, -32.9], [136.0, -34.9], [134.3, -32.6], [131.3, -31.5], [126.1, -32.2], [124.2, -33.0], [123.7, -33.9], [119.9, -34.0], [118.0, -35.1], [115.0, -34.2], [115.7, -33.3], [115.7, -31.6], [113.3, -26.1], [113.8, -26.5], [113.4, -25.6], [114.2, -26.3], [113.4, -24.4], [114.1, -21.8], [114.2, -22.5], [116.7, -20.7], [120.9, -19.7], [123.0, -16.4], [123.4, -17.3], [123.9, -17.1], [123.5, -16.6], [125.7, -14.2], [127.1, -13.8], [128.4, -14.9], [129.6, -15.0], [129.4, -14.4], [130.6, -12.5], [132.6, -12.1], [131.8, -11.3], [132.4, -11.1], [135.3, -12.2], [136.5, -11.9], [137.0, -12.4], [136.0, -13.3], [135.5, -15.0], [140.2, -17.7], [141.3, -16.4], [141.7, -12.4], [142.5, -10.7], [143.6, -13.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[162.1, -10.5], [162.4, -10.8], [161.7, -10.8], [161.3, -10.2], [162.1, -10.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[120.7, -10.2], [120.3, -10.3], [119.0, -9.6], [119.9, -9.4], [120.7, -10.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[160.9, -9.9], [159.8, -9.8], [159.7, -9.2], [160.4, -9.4], [160.9, -9.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[161.7, -9.6], [161.5, -9.8], [160.6, -8.3], [160.9, -8.3], [161.7, -9.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[124.4, -10.1], [123.5, -10.2], [125.1, -8.7], [127.3, -8.4], [124.4, -10.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[117.9, -8.1], [119.1, -8.7], [116.7, -9.0], [117.1, -8.5], [117.9, -8.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[122.9, -8.1], [122.8, -8.6], [119.9, -8.8], [120.7, -8.2], [122.9, -8.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[159.9, -8.3], [159.9, -8.5], [158.2, -7.4], [158.8, -7.6], [159.9, -8.3]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[157.5, -7.3], [156.9, -7.2], [156.5, -6.6], [157.1, -7.0], [157.5, -7.3]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[108.6, -6.8], [110.8, -6.5], [115.7, -8.4], [114.6, -8.8], [105.4, -6.9], [106.1, -5.9], [108.6, -6.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[134.7, -6.2], [134.2, -6.9], [134.5, -5.4], [134.7, -6.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[155.9, -6.8], [155.2, -6.5], [154.5, -5.1], [156.0, -6.5], [155.9, -6.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[152.0, -5.5], [150.2, -6.3], [148.3, -5.7], [150.1, -5.0], [150.8, -5.5], [151.5, -4.2], [152.3, -4.3], [152.0, -5.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[127.2, -3.5], [126.9, -3.8], [126.0, -3.2], [127.0, -3.1], [127.2, -3.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[130.5, -3.1], [130.8, -3.9], [127.9, -3.4], [128.1, -2.8], [130.5, -3.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[153.1, -4.5], [152.8, -4.8], [152.4, -3.8], [150.7, -2.7], [152.2, -3.2], [153.1, -4.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[134.1, -1.2], [134.4, -2.8], [135.5, -3.4], [136.3, -2.3], [138.3, -1.7], [144.6, -3.9], [146.0, -5.5], [147.6, -6.1], [147.9, -6.6], [147.0, -6.7], [147.2, -7.4], [150.7, -10.6], [147.9, -10.1], [146.0, -8.1], [144.7, -7.6], [143.3, -8.2], [143.4, -9.0], [142.6, -9.3], [139.1, -8.1], [137.6, -8.4], [138.7, -7.3], [137.9, -5.4], [133.7, -3.5], [133.0, -4.1], [132.0, -2.8], [133.7, -2.2], [132.2, -2.2], [130.5, -0.9], [132.4, -0.4], [134.1, -1.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[125.2, 1.4], [123.7, 0.2], [120.2, 0.2], [120.0, -0.5], [120.9, -1.4], [123.3, -0.6], [121.5, -1.9], [123.2, -5.3], [122.2, -5.3], [122.7, -4.5], [121.5, -4.6], [121.0, -2.6], [120.3, -2.9], [120.4, -5.5], [119.4, -5.4], [119.5, -3.5], [118.8, -2.8], [120.0, 0.6], [120.9, 1.3], [122.9, 0.9], [125.2, 1.4]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[128.7, 1.1], [128.6, 0.3], [128.1, 0.4], [128.1, -0.9], [127.4, 1.0], [127.9, 2.2], [128.7, 1.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[105.8, -5.9], [104.7, -5.9], [102.6, -4.2], [98.6, 1.8], [95.3, 5.5], [97.5, 5.2], [100.6, 2.1], [101.7, 2.1], [103.8, 0.1], [103.4, -0.7], [106.1, -3.1], [105.8, -5.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[117.9, 1.8], [119.0, 0.9], [117.8, 0.8], [117.5, -0.8], [116.6, -1.5], [116.1, -4.0], [110.2, -2.9], [110.1, -1.6], [109.1, -0.5], [109.1, 1.3], [109.7, 2.0], [111.2, 1.9], [111.4, 2.7], [113.0, 3.1], [116.7, 6.9], [119.2, 5.4], [117.3, 3.2], [117.9, 1.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[126.4, 8.4], [126.5, 7.2], [126.2, 6.3], [125.8, 7.3], [125.4, 6.8], [125.4, 5.6], [124.2, 6.2], [124.2, 7.4], [123.6, 7.8], [121.9, 7.2], [123.5, 8.7], [123.8, 8.2], [125.5, 9.0], [125.4, 9.8], [126.4, 8.4]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[81.2, 6.2], [80.3, 6.0], [79.9, 6.8], [80.1, 9.8], [81.8, 7.5], [81.2, 6.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-60.9, 10.1], [-61.8, 10.0], [-62.0, 10.1], [-61.1, 10.9], [-60.9, 10.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[124.0, 10.3], [123.0, 9.0], [122.4, 9.7], [122.9, 10.9], [123.5, 10.9], [123.3, 10.3], [124.1, 11.2], [124.0, 10.3]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[118.5, 9.3], [117.2, 8.4], [119.5, 11.4], [119.7, 10.6], [118.5, 9.3]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[121.9, 11.9], [123.1, 11.6], [122.0, 10.4], [122.0, 11.4], [121.9, 11.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[125.5, 12.2], [125.8, 11.0], [125.0, 11.3], [125.3, 10.4], [124.8, 10.1], [124.3, 11.5], [124.9, 11.8], [124.3, 12.6], [125.5, 12.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[121.5, 13.1], [121.3, 12.2], [120.3, 13.5], [121.2, 13.4], [121.5, 13.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[121.3, 18.5], [122.2, 18.5], [122.5, 17.1], [121.7, 15.9], [121.7, 14.3], [124.0, 13.8], [124.1, 12.5], [122.9, 13.6], [120.6, 13.9], [121.0, 14.5], [120.1, 15.0], [119.9, 16.4], [120.3, 16.0], [120.7, 18.5], [121.3, 18.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-65.6, 18.2], [-67.2, 17.9], [-67.2, 18.4], [-66.3, 18.5], [-65.6, 18.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-76.9, 17.9], [-77.2, 17.7], [-78.3, 18.2], [-76.2, 17.9], [-76.9, 17.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-72.6, 19.9], [-70.0, 19.6], [-68.3, 18.6], [-70.7, 18.4], [-71.4, 17.6], [-74.5, 18.3], [-72.3, 18.7], [-73.4, 19.6], [-72.6, 19.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[110.3, 18.7], [108.7, 18.5], [108.6, 19.4], [110.8, 20.1], [110.3, 18.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-155.5, 19.1], [-155.9, 19.1], [-155.9, 20.3], [-154.8, 19.5], [-155.5, 19.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-156.1, 20.6], [-156.4, 20.6], [-156.7, 20.9], [-156.3, 20.9], [-156.1, 20.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-156.8, 21.2], [-156.8, 21.1], [-157.3, 21.1], [-157.3, 21.2], [-156.8, 21.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-157.7, 21.3], [-158.1, 21.3], [-158.3, 21.6], [-158.0, 21.7], [-157.7, 21.3]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-159.3, 22.0], [-159.5, 21.9], [-159.8, 22.1], [-159.4, 22.2], [-159.3, 22.0]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-79.7, 22.8], [-78.3, 22.5], [-74.2, 20.3], [-77.8, 19.9], [-77.1, 20.4], [-78.7, 21.6], [-82.2, 22.4], [-81.8, 22.6], [-85.0, 21.9], [-82.3, 23.2], [-79.7, 22.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-77.5, 23.8], [-78.4, 24.6], [-78.2, 25.2], [-77.9, 25.2], [-77.5, 23.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[121.2, 22.8], [120.7, 22.0], [120.1, 23.6], [121.5, 25.3], [122.0, 25.0], [121.2, 22.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-77.8, 26.6], [-78.9, 26.4], [-79.0, 26.8], [-77.9, 26.8], [-77.8, 26.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-77.0, 26.6], [-77.2, 25.9], [-77.8, 27.0], [-77.0, 26.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[134.6, 34.1], [134.2, 33.2], [132.4, 33.0], [132.9, 34.1], [134.6, 34.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[34.6, 35.7], [33.0, 34.6], [32.3, 35.1], [32.9, 35.4], [34.6, 35.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[23.7, 35.7], [24.2, 35.4], [26.3, 35.3], [24.7, 34.9], [23.5, 35.3], [23.7, 35.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[15.5, 38.2], [15.1, 36.6], [12.4, 37.6], [12.6, 38.1], [15.5, 38.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[9.2, 41.2], [9.8, 40.5], [9.7, 39.2], [8.8, 38.9], [8.2, 41.0], [9.2, 41.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[141.0, 37.1], [140.3, 35.1], [137.2, 34.6], [135.8, 33.5], [135.1, 34.6], [131.0, 33.9], [132.0, 33.1], [131.3, 31.5], [130.7, 31.0], [130.2, 31.4], [130.4, 32.3], [129.4, 33.3], [132.6, 35.4], [135.7, 35.5], [136.7, 37.3], [137.4, 36.8], [139.4, 38.2], [139.9, 40.6], [141.4, 41.4], [141.9, 39.2], [141.0, 38.2], [141.0, 37.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[9.6, 42.2], [9.2, 41.4], [8.5, 42.3], [9.4, 43.0], [9.6, 42.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[143.9, 44.2], [145.3, 44.4], [145.5, 43.3], [144.1, 43.0], [143.2, 42.0], [141.6, 42.7], [141.1, 41.6], [140.0, 41.6], [139.8, 42.6], [140.3, 43.3], [141.4, 43.4], [142.0, 45.6], [143.9, 44.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-63.7, 46.6], [-62.9, 46.4], [-62.0, 46.4], [-62.9, 46.0], [-64.4, 46.7], [-63.7, 46.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-61.8, 49.1], [-63.6, 49.4], [-64.5, 49.9], [-62.9, 49.7], [-61.8, 49.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-123.5, 48.5], [-125.7, 48.8], [-128.1, 50.0], [-128.4, 50.8], [-125.8, 50.3], [-123.5, 48.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-56.1, 50.7], [-56.8, 49.8], [-56.1, 50.2], [-55.5, 49.9], [-55.8, 49.6], [-53.5, 49.2], [-53.8, 48.5], [-53.1, 48.7], [-52.6, 47.5], [-53.1, 46.7], [-54.2, 46.8], [-54.2, 47.8], [-55.4, 46.9], [-56.0, 46.9], [-55.3, 47.4], [-56.3, 47.6], [-59.3, 47.6], [-58.8, 48.3], [-59.2, 48.5], [-57.4, 50.7], [-55.4, 51.6], [-56.1, 50.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-132.7, 54.0], [-131.7, 54.1], [-132.0, 53.0], [-131.2, 52.2], [-133.1, 53.4], [-133.2, 54.2], [-132.7, 54.0]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[143.6, 50.7], [144.7, 49.0], [143.2, 49.3], [142.6, 47.9], [143.5, 46.1], [142.7, 46.7], [142.1, 46.0], [142.2, 51.0], [141.6, 51.9], [141.7, 53.3], [142.6, 53.8], [142.2, 54.2], [142.7, 54.4], [143.6, 50.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-6.8, 52.3], [-10.0, 51.8], [-9.2, 52.9], [-9.7, 53.9], [-6.7, 55.2], [-5.7, 54.6], [-6.8, 52.3]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[12.7, 55.6], [12.1, 54.8], [10.9, 55.8], [12.4, 56.1], [12.7, 55.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-153.0, 57.1], [-154.0, 56.7], [-154.7, 57.5], [-153.2, 58.0], [-152.1, 57.6], [-153.0, 57.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-3.0, 58.6], [-4.1, 57.6], [-2.0, 57.7], [-3.1, 56.0], [-2.1, 55.9], [0.5, 52.9], [1.7, 52.7], [1.1, 51.8], [1.4, 51.3], [-5.2, 50.0], [-5.8, 50.2], [-3.4, 51.4], [-5.3, 52.0], [-4.2, 52.3], [-4.6, 53.5], [-3.1, 53.4], [-2.9, 54.0], [-4.8, 54.8], [-5.0, 55.8], [-5.6, 55.3], [-6.1, 56.8], [-5.0, 58.6], [-3.0, 58.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-165.6, 59.9], [-166.2, 59.8], [-167.5, 60.2], [-165.7, 60.3], [-165.6, 59.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-79.3, 62.2], [-79.7, 61.6], [-80.4, 62.0], [-79.9, 62.4], [-79.3, 62.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-81.9, 62.7], [-83.1, 62.2], [-84.0, 62.5], [-83.3, 62.9], [-81.9, 62.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-171.7, 63.8], [-170.5, 63.7], [-168.7, 63.3], [-169.5, 63.0], [-171.7, 63.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-85.2, 65.7], [-85.0, 65.2], [-80.1, 63.7], [-81.0, 63.4], [-83.1, 64.1], [-85.5, 63.1], [-85.9, 63.6], [-87.2, 63.5], [-86.4, 64.0], [-85.9, 65.7], [-85.2, 65.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-14.5, 66.5], [-14.7, 65.8], [-13.6, 65.1], [-18.7, 63.5], [-22.8, 64.0], [-21.8, 64.4], [-24.0, 64.9], [-22.2, 65.4], [-24.3, 65.6], [-22.1, 66.4], [-20.6, 65.7], [-14.5, 66.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-75.9, 67.1], [-77.0, 67.1], [-77.2, 67.6], [-76.8, 68.1], [-75.1, 68.0], [-75.9, 67.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-175.0, 66.6], [-174.3, 66.3], [-174.6, 67.1], [-171.9, 66.9], [-169.9, 66.0], [-172.5, 65.4], [-173.0, 64.3], [-176.2, 65.4], [-178.4, 65.4], [-178.7, 66.1], [-179.9, 65.9], [-179.4, 65.4], [-180.0, 65.0], [-180.0, 69.0], [-174.9, 67.2], [-175.0, 66.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-95.6, 69.1], [-96.3, 68.8], [-99.8, 69.4], [-98.2, 70.1], [-95.6, 69.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[180.0, 70.8], [178.9, 70.8], [178.7, 71.1], [180.0, 71.5], [180.0, 70.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-178.7, 70.9], [-180.0, 70.8], [-180.0, 71.5], [-177.6, 71.3], [-178.7, 70.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-90.5, 69.5], [-90.6, 68.5], [-89.2, 69.3], [-88.0, 68.6], [-88.3, 67.9], [-87.4, 67.2], [-85.6, 68.8], [-85.5, 69.9], [-82.6, 69.7], [-81.3, 69.2], [-82.0, 68.1], [-81.3, 67.6], [-83.3, 66.4], [-85.8, 66.6], [-87.3, 64.8], [-89.9, 64.0], [-90.8, 63.0], [-93.2, 62.0], [-94.2, 60.9], [-94.7, 58.9], [-93.2, 58.8], [-92.3, 57.1], [-90.9, 57.3], [-85.0, 55.3], [-82.3, 55.1], [-82.1, 53.3], [-79.9, 51.2], [-78.6, 52.6], [-79.8, 54.7], [-76.5, 56.5], [-77.3, 58.1], [-78.5, 58.8], [-77.3, 59.9], [-78.1, 62.3], [-73.8, 62.4], [-71.4, 61.1], [-69.6, 61.1], [-69.3, 59.0], [-67.6, 58.2], [-64.6, 60.3], [-61.4, 57.0], [-61.8, 56.3], [-57.3, 54.6], [-55.8, 53.3], [-55.7, 52.1], [-60.0, 50.2], [-66.4, 50.2], [-71.1, 46.8], [-68.7, 48.3], [-65.1, 49.2], [-64.2, 48.7], [-65.1, 48.1], [-64.5, 46.2], [-61.5, 45.9], [-60.5, 47.0], [-59.8, 45.9], [-65.4, 43.5], [-66.1, 43.6], [-66.2, 44.5], [-64.4, 45.3], [-67.1, 45.1], [-70.7, 43.0], [-70.8, 42.3], [-70.0, 41.6], [-73.7, 40.9], [-71.9, 40.9], [-74.0, 40.8], [-74.9, 38.9], [-75.5, 39.5], [-75.1, 38.4], [-75.9, 37.2], [-76.3, 39.2], [-76.3, 38.1], [-77.0, 38.2], [-76.3, 37.9], [-75.7, 35.6], [-81.3, 31.4], [-80.1, 26.9], [-80.4, 25.2], [-81.7, 25.9], [-82.9, 29.1], [-84.1, 30.1], [-85.1, 29.6], [-86.4, 30.4], [-89.2, 30.3], [-89.6, 30.2], [-89.2, 29.3], [-90.2, 29.1], [-93.8, 29.7], [-96.6, 28.3], [-97.4, 27.4], [-97.9, 22.4], [-96.3, 19.3], [-94.4, 18.1], [-92.0, 18.7], [-90.8, 19.3], [-90.3, 21.0], [-87.1, 21.5], [-86.8, 20.8], [-87.8, 18.3], [-88.3, 18.5], [-88.4, 16.5], [-88.9, 15.9], [-85.0, 16.0], [-83.4, 15.3], [-83.8, 11.1], [-81.4, 8.8], [-79.6, 9.6], [-76.8, 8.6], [-75.7, 9.4], [-74.9, 11.1], [-73.4, 11.2], [-71.8, 12.4], [-71.1, 12.1], [-71.9, 11.4], [-71.7, 9.1], [-71.0, 9.9], [-71.4, 11.0], [-70.2, 11.4], [-69.9, 12.2], [-68.2, 10.6], [-64.9, 10.1], [-64.3, 10.6], [-61.9, 10.7], [-62.7, 10.4], [-62.4, 9.9], [-60.8, 9.4], [-60.7, 8.6], [-59.1, 8.0], [-57.1, 6.0], [-54.0, 5.8], [-51.3, 4.2], [-50.0, 1.7], [-50.4, -0.1], [-48.6, -0.2], [-48.6, -1.2], [-47.8, -0.6], [-44.9, -1.6], [-44.6, -2.7], [-40.0, -2.9], [-37.2, -4.8], [-35.6, -5.1], [-34.7, -7.3], [-35.1, -9.0], [-38.7, -13.1], [-39.3, -17.9], [-40.9, -21.9], [-42.0, -23.0], [-44.6, -23.4], [-47.6, -24.9], [-48.5, -25.9], [-48.9, -28.7], [-53.8, -34.4], [-56.2, -34.9], [-58.4, -33.9], [-56.8, -36.9], [-57.7, -38.2], [-59.2, -38.7], [-62.3, -38.8], [-62.1, -40.7], [-62.7, -41.0], [-65.1, -41.1], [-65.0, -42.1], [-63.5, -42.6], [-65.2, -43.5], [-65.6, -45.0], [-67.3, -45.6], [-67.6, -46.3], [-65.6, -47.2], [-66.0, -48.1], [-69.1, -50.7], [-68.2, -52.3], [-70.8, -52.9], [-71.0, -53.8], [-74.9, -52.3], [-75.6, -48.7], [-74.1, -46.9], [-75.6, -46.6], [-74.7, -45.8], [-74.4, -44.1], [-73.2, -44.5], [-72.7, -42.4], [-73.4, -42.1], [-73.7, -43.4], [-74.3, -43.2], [-73.2, -39.3], [-73.6, -37.2], [-71.4, -32.4], [-71.5, -28.9], [-70.9, -27.6], [-70.2, -19.8], [-70.4, -18.3], [-71.5, -17.4], [-76.0, -14.6], [-79.8, -7.2], [-81.2, -6.1], [-81.4, -4.7], [-79.8, -2.7], [-81.0, -2.2], [-80.9, -1.1], [-80.1, 0.8], [-78.9, 1.4], [-77.1, 3.8], [-78.2, 8.3], [-79.6, 8.9], [-80.5, 8.1], [-80.0, 7.5], [-80.9, 7.2], [-81.1, 7.8], [-83.5, 8.4], [-85.0, 10.1], [-85.1, 9.6], [-85.7, 9.9], [-85.7, 11.1], [-87.5, 13.3], [-91.2, 13.9], [-94.7, 16.2], [-96.6, 15.7], [-103.5, 18.3], [-105.5, 19.9], [-105.3, 21.4], [-106.0, 22.8], [-112.2, 29.0], [-113.1, 31.2], [-114.8, 31.8], [-114.7, 30.2], [-109.4, 23.2], [-110.0, 22.8], [-112.2, 24.7], [-112.3, 26.0], [-115.1, 27.7], [-114.2, 28.6], [-115.5, 29.6], [-117.3, 33.0], [-120.6, 34.6], [-124.4, 40.3], [-123.9, 45.5], [-124.7, 48.2], [-123.1, 48.0], [-122.6, 47.1], [-122.8, 49.0], [-127.4, 50.8], [-127.9, 52.3], [-129.1, 52.8], [-129.3, 53.6], [-132.0, 55.5], [-134.1, 58.1], [-136.6, 58.2], [-139.9, 59.5], [-147.1, 60.9], [-148.2, 60.7], [-148.0, 60.0], [-151.7, 59.2], [-151.4, 60.7], [-150.6, 61.3], [-154.0, 59.4], [-153.3, 58.9], [-154.2, 58.1], [-158.4, 56.0], [-164.8, 54.4], [-157.7, 57.6], [-157.0, 58.9], [-162.0, 58.7], [-161.9, 59.6], [-163.8, 59.8], [-166.1, 61.5], [-164.6, 63.1], [-160.8, 63.8], [-161.5, 64.4], [-160.8, 64.8], [-165.0, 64.4], [-168.1, 65.7], [-164.5, 66.6], [-161.7, 66.1], [-166.8, 68.4], [-163.2, 69.4], [-161.9, 70.3], [-156.6, 71.4], [-136.5, 68.9], [-129.8, 70.2], [-129.1, 69.8], [-128.1, 70.5], [-125.8, 69.5], [-124.4, 70.2], [-124.3, 69.4], [-121.5, 69.8], [-113.9, 68.4], [-115.3, 67.9], [-109.9, 68.0], [-108.9, 67.4], [-107.8, 67.9], [-108.8, 68.3], [-108.2, 68.7], [-106.2, 68.8], [-101.5, 67.6], [-98.4, 67.8], [-98.6, 68.4], [-97.7, 68.6], [-96.1, 68.2], [-96.1, 67.3], [-95.5, 68.1], [-94.7, 68.1], [-94.2, 69.1], [-96.5, 70.1], [-96.4, 71.2], [-95.2, 71.9], [-92.9, 71.3], [-91.5, 70.2], [-92.4, 69.7], [-90.5, 69.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-114.2, 73.1], [-114.7, 72.7], [-112.4, 73.0], [-111.1, 72.5], [-109.9, 73.0], [-108.2, 71.7], [-107.7, 72.1], [-108.4, 73.1], [-106.5, 73.1], [-105.4, 72.7], [-104.5, 71.0], [-101.0, 70.0], [-101.1, 69.6], [-102.7, 69.5], [-102.1, 69.1], [-102.4, 68.8], [-106.0, 69.2], [-113.3, 68.5], [-117.3, 70.0], [-112.4, 70.4], [-117.9, 70.5], [-118.4, 70.9], [-116.1, 71.3], [-119.4, 71.6], [-117.9, 72.7], [-114.2, 73.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-104.5, 73.4], [-105.4, 72.8], [-106.9, 73.5], [-105.3, 73.6], [-104.5, 73.4]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-76.3, 73.1], [-79.5, 72.7], [-80.9, 73.3], [-78.1, 73.7], [-76.3, 73.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-86.6, 73.2], [-85.8, 72.5], [-84.9, 73.3], [-82.3, 73.8], [-80.6, 72.7], [-80.7, 72.1], [-77.8, 72.7], [-74.1, 71.3], [-72.2, 71.6], [-68.8, 70.5], [-67.0, 69.2], [-68.8, 68.7], [-61.9, 66.9], [-63.9, 65.0], [-66.7, 66.4], [-68.0, 66.3], [-68.1, 65.7], [-65.3, 64.4], [-64.7, 63.4], [-65.0, 62.7], [-68.8, 63.7], [-66.2, 61.9], [-71.0, 62.9], [-74.8, 64.7], [-77.7, 64.2], [-78.6, 64.6], [-77.9, 65.3], [-74.0, 65.5], [-74.3, 65.8], [-72.7, 67.3], [-72.9, 67.7], [-79.0, 70.2], [-84.9, 70.0], [-88.7, 70.4], [-89.5, 70.8], [-88.5, 71.2], [-89.9, 71.2], [-90.2, 72.2], [-89.4, 73.1], [-85.8, 73.8], [-86.6, 73.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-100.4, 73.8], [-97.4, 73.8], [-98.1, 73.0], [-96.5, 72.6], [-96.7, 71.7], [-99.3, 71.4], [-102.5, 72.5], [-100.4, 72.7], [-101.5, 73.4], [-100.4, 73.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[143.6, 73.2], [142.1, 73.2], [139.9, 73.4], [142.1, 73.9], [143.6, 73.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-93.2, 72.8], [-95.4, 72.1], [-96.0, 73.4], [-94.5, 74.1], [-90.5, 73.9], [-93.2, 72.8]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-120.5, 71.4], [-123.1, 70.9], [-125.9, 71.9], [-123.9, 73.7], [-124.9, 74.3], [-117.6, 74.2], [-115.5, 73.5], [-119.2, 72.5], [-120.5, 71.4]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[150.7, 75.1], [149.6, 74.7], [146.1, 75.2], [146.4, 75.5], [150.7, 75.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-93.6, 75.0], [-94.2, 74.6], [-96.8, 74.9], [-94.9, 75.6], [-93.6, 75.0]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[145.1, 75.6], [144.3, 74.8], [139.0, 74.6], [137.0, 75.3], [138.8, 76.1], [145.1, 75.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-98.5, 76.7], [-97.7, 76.3], [-98.2, 75.0], [-102.5, 75.6], [-102.6, 76.3], [-98.5, 76.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-108.2, 76.2], [-105.9, 76.0], [-105.7, 75.5], [-112.2, 74.4], [-113.9, 74.7], [-111.8, 75.2], [-117.7, 75.2], [-115.4, 76.5], [-109.1, 75.5], [-110.5, 76.4], [-109.6, 76.8], [-108.2, 76.2]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[57.5, 70.7], [53.7, 70.8], [51.5, 72.0], [54.4, 73.6], [53.5, 73.7], [55.9, 74.6], [55.6, 75.1], [61.2, 76.3], [68.2, 76.9], [68.9, 76.5], [58.5, 74.3], [55.4, 72.4], [55.6, 71.5], [57.5, 70.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-94.7, 77.1], [-91.6, 76.8], [-89.2, 75.6], [-81.1, 75.7], [-79.8, 74.9], [-89.8, 74.5], [-92.4, 74.8], [-92.9, 75.9], [-93.9, 76.3], [-97.1, 76.8], [-94.7, 77.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-116.2, 77.6], [-117.1, 76.5], [-122.9, 76.1], [-119.1, 77.5], [-116.2, 77.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[107.0, 77.0], [107.2, 76.5], [111.1, 76.7], [114.1, 75.8], [113.9, 75.3], [109.4, 74.2], [113.0, 74.0], [113.5, 73.3], [115.6, 73.8], [123.2, 73.0], [123.3, 73.7], [127.0, 73.6], [128.6, 73.0], [129.1, 72.4], [128.5, 72.0], [131.3, 70.8], [132.3, 71.8], [139.9, 71.5], [139.1, 72.4], [140.5, 72.8], [149.5, 72.2], [153.0, 70.8], [159.0, 70.9], [159.8, 70.5], [159.7, 69.7], [160.9, 69.4], [167.8, 69.6], [169.6, 68.7], [170.8, 69.0], [170.0, 69.7], [170.5, 70.1], [175.7, 69.9], [180.0, 69.0], [180.0, 65.0], [177.4, 64.6], [179.4, 63.0], [179.2, 62.3], [177.4, 62.5], [173.7, 61.7], [170.3, 59.9], [168.9, 60.6], [166.3, 59.8], [163.5, 59.9], [162.0, 58.2], [163.2, 57.6], [163.1, 56.2], [162.1, 56.1], [161.7, 55.3], [162.1, 54.9], [160.4, 54.3], [160.0, 53.2], [158.5, 53.0], [158.2, 51.9], [156.8, 51.0], [155.4, 55.4], [155.9, 56.8], [156.8, 57.8], [158.4, 58.1], [163.7, 61.1], [164.5, 62.6], [163.3, 62.5], [160.1, 60.5], [159.3, 61.8], [156.7, 61.4], [154.2, 59.8], [155.0, 59.1], [151.3, 58.8], [151.3, 59.5], [149.8, 59.7], [142.2, 59.0], [135.1, 54.7], [138.2, 53.8], [139.9, 54.2], [141.3, 53.1], [141.4, 52.2], [140.6, 51.2], [140.1, 48.4], [138.2, 46.3], [134.9, 43.4], [133.5, 42.8], [132.3, 43.3], [127.5, 39.8], [127.4, 39.2], [129.5, 36.8], [129.1, 35.1], [126.5, 34.4], [126.1, 36.7], [126.9, 36.9], [126.2, 37.7], [124.7, 38.1], [125.3, 39.6], [124.3, 39.9], [121.1, 38.9], [122.2, 40.4], [121.6, 40.9], [118.0, 39.2], [117.5, 38.7], [118.9, 37.4], [119.7, 37.2], [120.8, 37.9], [122.4, 37.5], [122.5, 36.9], [121.1, 36.7], [119.2, 34.9], [120.2, 34.4], [121.9, 31.7], [121.3, 30.7], [122.1, 29.8], [121.7, 28.2], [118.7, 24.5], [115.9, 22.8], [110.8, 21.4], [110.4, 20.3], [109.9, 20.3], [109.9, 21.4], [108.5, 21.7], [105.9, 19.8], [105.7, 19.1], [108.9, 15.3], [109.3, 13.4], [109.2, 11.7], [105.2, 8.6], [105.1, 9.9], [103.5, 10.6], [102.6, 12.2], [100.8, 12.6], [101.0, 13.4], [100.1, 13.4], [99.2, 9.2], [99.9, 9.2], [100.5, 7.4], [103.0, 5.5], [104.2, 1.3], [101.4, 2.8], [100.1, 6.5], [98.5, 8.4], [98.3, 7.8], [98.8, 11.4], [97.2, 16.9], [95.4, 15.7], [94.2, 16.0], [94.3, 18.2], [91.4, 22.8], [90.5, 22.8], [90.3, 21.8], [87.0, 21.5], [86.5, 20.2], [85.1, 19.5], [82.2, 16.6], [80.3, 15.9], [79.9, 10.4], [77.5, 8.0], [76.6, 8.9], [73.5, 16.0], [72.6, 21.4], [70.5, 20.9], [69.2, 22.1], [69.3, 22.8], [67.4, 23.9], [66.4, 25.4], [61.5, 25.1], [57.4, 25.7], [56.5, 27.1], [54.7, 26.5], [51.5, 27.9], [50.1, 30.1], [48.0, 30.0], [50.8, 24.8], [51.0, 26.0], [51.6, 25.8], [51.8, 24.0], [54.0, 24.1], [56.4, 26.4], [56.8, 24.2], [58.7, 23.6], [59.8, 22.3], [57.8, 20.2], [57.7, 18.9], [55.3, 17.2], [52.4, 16.4], [52.2, 15.6], [48.7, 14.0], [43.5, 12.6], [42.6, 16.8], [39.1, 21.3], [38.5, 23.7], [34.6, 28.1], [34.9, 29.5], [33.9, 27.6], [32.4, 29.9], [35.7, 23.9], [35.5, 23.1], [36.9, 22.0], [37.5, 18.6], [38.4, 18.0], [39.3, 15.9], [43.3, 12.4], [42.7, 11.7], [44.6, 10.4], [51.1, 12.0], [51.0, 10.6], [47.7, 4.2], [40.3, -2.6], [39.2, -4.7], [38.8, -6.5], [39.4, -6.8], [39.2, -8.5], [40.5, -10.8], [40.8, -14.7], [39.5, -16.7], [34.8, -19.8], [35.6, -23.7], [32.6, -25.7], [32.2, -28.8], [28.2, -32.8], [25.8, -33.9], [22.6, -33.9], [19.6, -34.8], [18.4, -34.1], [18.2, -31.7], [15.2, -27.1], [14.3, -22.1], [11.8, -18.1], [11.8, -15.8], [13.6, -12.0], [13.7, -10.7], [11.9, -5.0], [8.8, -1.1], [9.8, 3.1], [9.4, 3.7], [8.5, 4.8], [5.9, 4.3], [4.3, 6.3], [1.9, 6.1], [-2.0, 4.7], [-4.6, 5.2], [-7.5, 4.3], [-9.0, 4.8], [-12.4, 7.3], [-14.8, 10.9], [-16.6, 12.2], [-16.7, 13.6], [-17.6, 14.7], [-16.5, 16.1], [-16.1, 18.1], [-17.0, 21.9], [-14.4, 26.3], [-9.6, 29.9], [-9.3, 32.6], [-6.9, 34.1], [-5.9, 35.8], [-2.2, 35.2], [1.5, 36.6], [9.5, 37.4], [10.2, 36.7], [11.1, 36.9], [10.3, 33.8], [15.2, 32.3], [15.7, 31.4], [19.1, 30.3], [20.1, 31.0], [20.1, 32.2], [21.5, 32.8], [28.9, 30.9], [31.0, 31.6], [32.0, 30.9], [33.8, 31.0], [36.0, 34.6], [36.2, 36.7], [32.5, 36.1], [31.7, 36.6], [29.7, 36.1], [27.6, 36.7], [26.3, 38.2], [26.8, 39.0], [26.2, 39.5], [27.3, 40.4], [28.8, 40.5], [29.2, 41.2], [31.1, 41.1], [33.5, 42.0], [38.3, 40.9], [40.4, 41.0], [41.7, 42.0], [41.5, 42.6], [36.7, 45.2], [38.2, 46.2], [37.7, 46.6], [39.1, 47.3], [35.0, 46.3], [35.0, 45.7], [36.5, 45.5], [36.3, 45.1], [33.9, 44.4], [32.5, 45.3], [33.3, 46.1], [30.7, 46.6], [29.6, 45.0], [28.8, 44.9], [27.7, 42.6], [28.8, 41.1], [26.4, 40.2], [26.1, 40.8], [24.9, 40.9], [23.7, 40.7], [24.4, 40.1], [23.9, 40.0], [22.6, 40.3], [24.0, 37.7], [23.1, 37.9], [23.2, 36.4], [22.5, 36.4], [19.4, 40.3], [19.5, 41.7], [13.1, 45.7], [12.3, 45.4], [12.6, 44.1], [18.5, 40.2], [16.9, 40.4], [16.4, 39.8], [17.1, 38.9], [16.1, 38.0], [15.7, 37.9], [16.1, 39.0], [15.4, 40.0], [12.1, 41.7], [10.5, 42.9], [10.2, 43.9], [8.9, 44.4], [6.5, 43.1], [3.1, 43.1], [3.0, 41.9], [0.8, 41.0], [-0.3, 39.3], [0.1, 38.7], [-2.1, 36.7], [-4.4, 36.7], [-5.4, 35.9], [-6.5, 36.9], [-8.9, 36.9], [-8.8, 38.3], [-9.5, 38.7], [-8.8, 40.8], [-9.4, 43.0], [-8.0, 43.7], [-1.9, 43.4], [-1.4, 44.0], [-1.2, 46.0], [-3.0, 47.6], [-4.5, 48.0], [-4.6, 48.7], [-1.6, 48.6], [-1.9, 49.8], [-1.0, 49.3], [1.3, 50.1], [1.6, 50.9], [3.8, 51.6], [4.7, 53.1], [8.1, 53.5], [8.8, 54.0], [8.1, 55.5], [8.5, 57.1], [10.6, 57.7], [10.3, 56.9], [10.9, 56.5], [9.7, 55.5], [10.9, 54.0], [12.5, 54.5], [14.1, 53.8], [17.6, 54.9], [19.7, 54.4], [21.3, 55.2], [21.6, 57.4], [22.5, 57.8], [24.1, 57.0], [24.4, 58.4], [23.4, 58.6], [23.3, 59.2], [29.1, 60.0], [28.1, 60.5], [22.9, 59.8], [21.3, 60.7], [21.1, 62.6], [21.5, 63.2], [25.4, 65.1], [23.9, 66.0], [22.2, 65.7], [21.2, 65.0], [21.4, 64.4], [17.8, 62.7], [17.1, 61.3], [18.8, 60.1], [17.9, 59.0], [16.8, 58.7], [15.9, 56.1], [12.9, 55.4], [10.4, 59.5], [8.4, 58.3], [5.7, 58.6], [5.0, 62.0], [10.5, 64.5], [14.8, 67.8], [19.2, 69.8], [23.0, 70.2], [24.5, 71.0], [28.2, 71.2], [31.3, 70.5], [30.0, 70.2], [31.1, 69.6], [32.1, 69.9], [36.5, 69.1], [41.1, 67.5], [41.1, 66.8], [38.4, 66.0], [33.2, 66.6], [34.8, 65.9], [34.9, 64.4], [37.0, 63.8], [36.5, 64.8], [37.2, 65.1], [39.6, 64.5], [40.4, 64.8], [39.8, 65.5], [42.1, 66.5], [43.9, 66.1], [44.5, 66.8], [43.7, 67.4], [44.2, 68.0], [43.5, 68.6], [46.3, 68.3], [46.8, 67.7], [45.6, 67.6], [45.6, 67.0], [46.3, 66.7], [53.7, 68.9], [54.5, 68.8], [53.5, 68.2], [58.8, 68.9], [59.9, 68.3], [61.1, 68.9], [60.0, 69.5], [60.6, 69.9], [68.5, 68.1], [69.2, 68.6], [66.9, 69.5], [66.7, 71.0], [69.2, 72.8], [72.6, 72.8], [72.8, 72.2], [71.8, 71.4], [72.8, 70.4], [72.6, 69.0], [73.7, 68.4], [71.3, 66.3], [72.4, 66.2], [75.1, 67.8], [74.5, 68.3], [74.9, 69.0], [73.6, 69.6], [74.4, 70.6], [73.1, 71.4], [74.9, 72.1], [74.7, 72.8], [75.7, 72.3], [75.3, 71.3], [76.4, 71.2], [75.9, 71.9], [77.6, 72.3], [81.5, 71.8], [80.6, 72.6], [80.5, 73.6], [86.8, 73.9], [86.0, 74.5], [87.2, 75.1], [100.8, 76.4], [104.4, 77.7], [106.1, 77.4], [104.7, 77.1], [107.0, 77.0]], [[49.1, 41.3], [50.4, 40.3], [49.6, 40.2], [48.9, 38.8], [49.2, 37.6], [50.8, 36.9], [53.8, 37.0], [53.9, 39.0], [53.1, 39.3], [53.4, 40.0], [52.7, 40.0], [52.9, 40.9], [54.7, 41.0], [53.7, 42.1], [52.9, 41.9], [52.8, 41.1], [52.5, 42.8], [51.3, 43.1], [50.3, 44.6], [53.0, 45.3], [53.0, 46.9], [51.2, 47.0], [49.1, 46.4], [46.7, 44.6], [49.1, 41.3]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-93.8, 77.5], [-96.2, 77.6], [-96.4, 77.8], [-94.4, 77.8], [-93.8, 77.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-110.2, 77.7], [-112.1, 77.4], [-113.5, 77.7], [-109.9, 78.0], [-110.2, 77.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[24.7, 77.9], [22.5, 77.4], [20.7, 77.7], [21.4, 77.9], [20.8, 78.3], [22.9, 78.5], [24.7, 77.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-109.7, 78.6], [-110.9, 78.4], [-112.5, 78.4], [-111.5, 78.8], [-109.7, 78.6]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-95.8, 78.1], [-98.1, 78.1], [-98.6, 78.9], [-95.6, 78.4], [-95.8, 78.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-100.1, 78.3], [-99.7, 77.9], [-105.2, 78.4], [-104.2, 78.7], [-105.5, 79.3], [-100.1, 78.3]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[105.1, 78.3], [99.4, 77.9], [102.1, 79.3], [105.4, 78.7], [105.1, 78.3]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[18.3, 79.7], [21.5, 79.0], [19.0, 78.6], [17.1, 76.8], [15.9, 76.8], [13.8, 77.4], [14.7, 77.7], [10.4, 79.7], [18.3, 79.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[25.4, 80.4], [27.4, 80.1], [23.0, 79.4], [17.4, 80.3], [25.4, 80.4]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[51.1, 80.5], [47.6, 80.0], [46.5, 80.2], [47.1, 80.6], [44.8, 80.6], [51.5, 80.7], [51.1, 80.5]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[99.9, 78.9], [95.0, 79.0], [91.2, 80.3], [95.9, 81.3], [100.2, 79.8], [99.9, 78.9]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-87.0, 79.7], [-85.8, 79.3], [-90.8, 78.2], [-92.9, 78.3], [-94.0, 78.8], [-93.1, 79.4], [-96.7, 80.2], [-94.3, 81.0], [-94.7, 81.2], [-92.4, 81.3], [-87.8, 80.3], [-87.0, 79.7]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-68.5, 83.1], [-61.8, 82.6], [-67.7, 81.5], [-65.5, 81.5], [-71.2, 79.8], [-76.9, 79.3], [-75.5, 79.2], [-76.2, 79.0], [-75.4, 78.5], [-79.8, 77.2], [-77.9, 76.8], [-80.6, 76.2], [-89.5, 76.5], [-89.6, 77.0], [-87.8, 77.2], [-88.3, 77.9], [-85.0, 77.5], [-88.0, 78.4], [-85.1, 79.3], [-86.9, 80.3], [-81.8, 80.5], [-87.6, 80.5], [-91.6, 81.9], [-85.5, 82.7], [-83.2, 82.3], [-79.3, 83.1], [-68.5, 83.1]]]
            }
        }, {
            "type": "Feature",
            "properties": {
                "featurecla": "Country",
                "scalerank": 1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [[[-27.1, 83.5], [-20.8, 82.7], [-31.9, 82.2], [-22.1, 81.7], [-23.2, 81.2], [-15.8, 81.9], [-12.2, 81.3], [-20.0, 80.2], [-17.7, 80.1], [-19.7, 78.8], [-19.7, 77.6], [-18.5, 77.0], [-21.7, 76.6], [-19.8, 76.1], [-19.6, 75.2], [-20.7, 75.2], [-19.4, 74.3], [-21.6, 74.2], [-20.4, 73.8], [-20.8, 73.5], [-23.6, 73.3], [-22.3, 72.2], [-24.8, 72.3], [-22.1, 71.5], [-21.8, 70.7], [-23.5, 70.5], [-25.5, 71.4], [-25.2, 70.8], [-26.4, 70.2], [-22.3, 70.1], [-27.7, 68.5], [-31.8, 68.1], [-34.2, 66.7], [-39.8, 65.5], [-41.2, 63.5], [-42.8, 62.7], [-42.4, 61.9], [-43.4, 60.1], [-48.3, 60.9], [-51.6, 63.6], [-54.0, 67.2], [-53.0, 68.4], [-51.5, 68.7], [-50.9, 69.9], [-53.5, 69.3], [-54.7, 69.6], [-54.4, 70.8], [-51.4, 70.6], [-55.8, 71.7], [-54.7, 72.6], [-58.6, 75.5], [-61.3, 76.1], [-68.5, 76.1], [-71.4, 77.0], [-66.8, 77.4], [-73.3, 78.0], [-65.7, 79.4], [-65.3, 79.8], [-68.0, 80.1], [-62.2, 81.3], [-62.7, 81.8], [-53.0, 81.9], [-50.4, 82.4], [-44.5, 81.7], [-46.9, 82.2], [-46.8, 82.6], [-38.6, 83.5], [-27.1, 83.5]]]
            }
        }]
    }

});