## Predefined APIs
This is the map router for KOA and Ginkgoch Map Library.

### Get current map state
GET: `/maps/{{map}}`

#### Example 1: Get current map state
* GET: `http://localhost:3000/maps/Default`

* Response:
```json
{
    "name": "Map",
    "srs": {
        "projection": "EPSG:900913",
        "unit": "m"
    },
    "width": 256,
    "height": 256,
    "origin": "upperLeft",
    "maximumScale": 10000000000,
    "minimumScale": 0,
    "scales": [
        591659030.6768064,
        295829515.3384032,
        147914757.6692016,
        73957378.8346008,
        36978689.4173004,
        18489344.7086502,
        9244672.3543251,
        4622336.17716255,
        2311168.088581275,
        1155584.0442906376,
        577792.0221453188,
        288896.0110726594,
        144448.0055363297,
        72224.00276816485,
        36112.001384082425,
        18056.000692041212,
        9028.000346020606,
        4514.000173010303,
        2257.0000865051516,
        1128.5000432525758
    ],
    "groups": [
        {
            "type": "layer-group",
            "name": "Default",
            "visible": true,
            "layers": [
                {
                    "type": "feature-layer",
                    "id": "layer-j64mybw4",
                    "name": "cntry02",
                    "source": {
                        "type": "shapefile-feature-source",
                        "name": "cntry02",
                        "projection": {
                            "from": {
                                "unit": "unknown"
                            },
                            "to": {
                                "unit": "unknown"
                            }
                        },
                        "flag": "rs",
                        "filePath": "./data/cntry02.shp"
                    },
                    "styles": [
                        {
                            "visible": true,
                            "id": "style-dmgb3m8w",
                            "type": "fill-style",
                            "name": "Fill Style",
                            "maximumScale": 10000000000,
                            "minimumScale": 0,
                            "lineWidth": 1,
                            "fillStyle": "#f0f0f0",
                            "strokeStyle": "#636363"
                        }
                    ],
                    "minimumScale": 0,
                    "maximumScale": 10000000000,
                    "visible": true
                }
            ]
        }
    ]
}
```

### Get map xyz tile image
GET: `/maps/{{map}}/tiles/xyz/{{z}}/{{x}}/{{y}}`

#### Example 1: Get map xyz tile image
* GET: `http://localhost:3000/maps/Default/tiles/xyz/{{z}}/{{x}}/{{y}}`

* Response:

![tile-0-0-0](./images/tile-0-0-0.png)

### Get groups state
GET: `/maps/{{map}}/groups`

#### Example 1: Get groups state
* GET: `http://localhost:3000/maps/Default/groups`

* Response:
```json
[
    {
        "type": "layer-group",
        "name": "Default",
        "visible": true,
        "layers": [
            {
                "type": "feature-layer",
                "id": "layer-j64mybw4",
                "name": "cntry02",
                "source": {
                    "type": "shapefile-feature-source",
                    "name": "cntry02",
                    "projection": {
                        "from": {
                            "unit": "unknown"
                        },
                        "to": {
                            "unit": "unknown"
                        }
                    },
                    "flag": "rs",
                    "filePath": "./data/cntry02.shp"
                },
                "styles": [
                    {
                        "visible": true,
                        "id": "style-dmgb3m8w",
                        "type": "fill-style",
                        "name": "Fill Style",
                        "maximumScale": 10000000000,
                        "minimumScale": 0,
                        "lineWidth": 1,
                        "fillStyle": "#f0f0f0",
                        "strokeStyle": "#636363"
                    }
                ],
                "minimumScale": 0,
                "maximumScale": 10000000000,
                "visible": true
            }
        ]
    }
]
```

### Get a group by name
GET: `/maps/{{map}}/groups/{{group}}`

#### Example 1: Get a group by name
* GET: `http://localhost:3000/maps/Default/groups/Default`

* Response:
```json
{
    "type": "layer-group",
    "name": "Default",
    "visible": true,
    "layers": [
        {
            "type": "feature-layer",
            "id": "layer-j64mybw4",
            "name": "cntry02",
            "source": {
                "type": "shapefile-feature-source",
                "name": "cntry02",
                "projection": {
                    "from": {
                        "unit": "unknown"
                    },
                    "to": {
                        "unit": "unknown"
                    }
                },
                "flag": "rs",
                "filePath": "./data/cntry02.shp"
            },
            "styles": [
                {
                    "visible": true,
                    "id": "style-dmgb3m8w",
                    "type": "fill-style",
                    "name": "Fill Style",
                    "maximumScale": 10000000000,
                    "minimumScale": 0,
                    "lineWidth": 1,
                    "fillStyle": "#f0f0f0",
                    "strokeStyle": "#636363"
                }
            ],
            "minimumScale": 0,
            "maximumScale": 10000000000,
            "visible": true
        }
    ]
}
```

### Get all layers in a specified group
GET: `/maps/{{map}}/groups/{{group}}/layers`

#### Example 1: Get all layers in a specified group
* GET: `http://localhost:3000/maps/Default/groups/Default/layers`

* Response:
```json
[
    {
        "type": "feature-layer",
        "id": "layer-j64mybw4",
        "name": "cntry02",
        "source": {
            "type": "shapefile-feature-source",
            "name": "cntry02",
            "projection": {
                "from": {
                    "unit": "unknown"
                },
                "to": {
                    "unit": "unknown"
                }
            },
            "flag": "rs",
            "filePath": "./data/cntry02.shp"
        },
        "styles": [
            {
                "visible": true,
                "id": "style-dmgb3m8w",
                "type": "fill-style",
                "name": "Fill Style",
                "maximumScale": 10000000000,
                "minimumScale": 0,
                "lineWidth": 1,
                "fillStyle": "#f0f0f0",
                "strokeStyle": "#636363"
            }
        ],
        "minimumScale": 0,
        "maximumScale": 10000000000,
        "visible": true
    }
]
```

### Get a layer in a specified group
GET: `/maps/{{map}}/groups/{{group}}/layers/{{layer}}`

#### Example 1: Get a layer named "cntry02" in a specified group named "Default"
* GET: `http://localhost:3000/maps/Default/groups/Default/layers/cntry02`

* Response:
```json
{
    "type": "feature-layer",
    "id": "layer-j64mybw4",
    "name": "cntry02",
    "source": {
        "type": "shapefile-feature-source",
        "name": "cntry02",
        "projection": {
            "from": {
                "unit": "unknown"
            },
            "to": {
                "unit": "unknown"
            }
        },
        "flag": "rs",
        "filePath": "./data/cntry02.shp"
    },
    "styles": [
        {
            "visible": true,
            "id": "style-dmgb3m8w",
            "type": "fill-style",
            "name": "Fill Style",
            "maximumScale": 10000000000,
            "minimumScale": 0,
            "lineWidth": 1,
            "fillStyle": "#f0f0f0",
            "strokeStyle": "#636363"
        }
    ],
    "minimumScale": 0,
    "maximumScale": 10000000000,
    "visible": true,
    "envelope": {
        "minx": -20037508.23146975,
        "miny": -20037508.231469806,
        "maxx": 20037508.23146975,
        "maxy": 18418382.328923147
    },
    "count": 251,
    "geomType": "Polygon"
}
```

#### Example 2: Get a layer in a specified group with some specified fields
* GET: `http://localhost:3000/maps/Default/groups/Default/layers/cntry02?fields=name,styles`

* Response:
```json
{
    "name": "cntry02",
    "styles": [
        {
            "visible": true,
            "id": "style-dmgb3m8w",
            "type": "fill-style",
            "name": "Fill Style",
            "maximumScale": 10000000000,
            "minimumScale": 0,
            "lineWidth": 1,
            "fillStyle": "#f0f0f0",
            "strokeStyle": "#636363"
        }
    ]
}
```

### Get all fields info in a specified layer
GET: `/maps/{{map}}/groups/{{group}}/layers/{{layer}}/fields`

#### Example 1: Get all fields info in a specified layer
* GET: `http://localhost:3000/maps/Default/groups/{{group}}/layers/{{layer}}/fields?fields=name,type`

* Response:
```json
[
    {
        "name": "FIPS_CNTRY",
        "type": "character"
    },
    {
        "name": "GMI_CNTRY",
        "type": "character"
    },
    ...
]
```

#### Example 2: Get all fields info in a specified layer
* GET: `http://localhost:3000/maps/Default/groups/{{group}}/layers/{{layer}}/fields?`

* Response:
```json
[
    {
        "name": "FIPS_CNTRY",
        "type": "character",
        "length": 2,
        "extra": {
            "decimal": 0
        }
    },
    ...
]
```

### Get features from a specific layer
GET: `/maps/{{map}}/groups/{{group}}/layers/{{layer}}/features`

#### Example 1: Get features from a specific layer with supported filters
* GET: `http://localhost:3000/maps/Default/groups/{{group}}/layers/{{layer}}/features?outCRS=WGS84&simplifyZoom=0&simplifyTolerance=2&from=2&limit=2`

* Response:
```json
{
    "id": 0,
    "type": "FeatureCollection",
    "features": [
        {
            "id": 3,
            "type": "Feature",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                8.415797233581543,
                                56.67812728881836
                            ],
                            [
                                8.415797233581543,
                                56.67812728881836
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                9.610275268554686,
                                55.394439697265625
                            ],
                            [
                                9.302568435668945,
                                56.99985504150389
                            ],
                            [
                                9.5897216796875,
                                55.41819000244139
                            ],
                            [
                                9.610275268554686,
                                55.394439697265625
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                10.982221603393553,
                                57.221664428710945
                            ],
                            [
                                10.982221603393553,
                                57.221664428710945
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                8.655277252197266,
                                56.67416381835937
                            ],
                            [
                                8.655277252197266,
                                56.67416381835937
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                12.339457511901855,
                                55.59020614624021
                            ],
                            [
                                12.339457511901855,
                                55.59020614624021
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                10.666893005371094,
                                55.89258575439454
                            ],
                            [
                                10.666893005371094,
                                55.89258575439454
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                10.000304222106934,
                                55.54126358032226
                            ],
                            [
                                10.000304222106934,
                                55.54126358032226
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                15.04249954223633,
                                54.994720458984375
                            ],
                            [
                                15.04249954223633,
                                54.994720458984375
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                10.7147216796875,
                                54.72499847412108
                            ],
                            [
                                10.7147216796875,
                                54.72499847412108
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                10,
                                54.98371887207031
                            ],
                            [
                                10,
                                54.98371887207031
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                10.565277099609375,
                                54.94610595703124
                            ],
                            [
                                10.565277099609375,
                                54.94610595703124
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                12.183610916137695,
                                54.88027191162109
                            ],
                            [
                                12.183610916137695,
                                54.88027191162109
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                10.4072208404541,
                                54.82138824462891
                            ],
                            [
                                10.4072208404541,
                                54.82138824462891
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                11.850586891174316,
                                54.95478439331054
                            ],
                            [
                                11.850586891174316,
                                54.95478439331054
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                10.989891052246094,
                                54.79084777832031
                            ],
                            [
                                10.989891052246094,
                                54.79084777832031
                            ]
                        ]
                    ]
                ]
            },
            "properties": {
                "FIPS_CNTRY": "DA",
                "GMI_CNTRY": "DNK",
                "ISO_2DIGIT": "DK",
                "ISO_3DIGIT": "DNK",
                "CNTRY_NAME": "Denmark",
                "LONG_NAME": "Denmark",
                "SOVEREIGN": "Denmark",
                "POP_CNTRY": 4667750,
                "CURR_TYPE": "Danish Krone",
                "CURR_CODE": "DKK",
                "LANDLOCKED": "N",
                "SQKM": 42509.49,
                "SQMI": 16412.91,
                "COLOR_MAP": "6",
                "RECID": 3
            }
        },
        {
            "id": 4,
            "type": "Feature",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                23.504039764404297,
                                53.94704437255859
                            ],
                            [
                                21.197494506835938,
                                55.57499694824218
                            ],
                            [
                                24.069856643676758,
                                56.28360748291015
                            ],
                            [
                                25.727079391479492,
                                54.674858093261726
                            ],
                            [
                                23.504039764404297,
                                53.94704437255859
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                20.984813690185543,
                                55.276550292968736
                            ],
                            [
                                20.984813690185543,
                                55.276550292968736
                            ]
                        ]
                    ]
                ]
            },
            "properties": {
                "FIPS_CNTRY": "LH",
                "GMI_CNTRY": "LTU",
                "ISO_2DIGIT": "LT",
                "ISO_3DIGIT": "LTU",
                "CNTRY_NAME": "Lithuania",
                "LONG_NAME": "Lithuania",
                "SOVEREIGN": "Lithuania",
                "POP_CNTRY": 3786560,
                "CURR_TYPE": "Lita",
                "CURR_CODE": "LTL",
                "LANDLOCKED": "N",
                "SQKM": 64712.64,
                "SQMI": 24985.55,
                "COLOR_MAP": "2",
                "RECID": 4
            }
        }
    ]
}
```

### Query features from a specific layer
POST: `/maps/{{map}}/groups/{{group}}/layers/{{layer}}/query`

#### Example 1: Query features from a specific layer
* POST: `http://localhost:3000/maps/Default/groups/{{group}}/layers/{{layer}}/query?simplifyZoom=0`

* Response:
```json
{
    "id": 0,
    "type": "FeatureCollection",
    "features": [
        {
            "id": 47,
            "type": "Feature",
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                10870345.897922285,
                                2735347.9366305424
                            ],
                            [
                                10885869.40906669,
                                2892642.4990043603
                            ],
                            [
                                10992334.299263539,
                                3051952.368473601
                            ],
                            [
                                10938622.848787861,
                                3210818.4819574133
                            ],
                            [
                                10777362.80091431,
                                3295280.988412184
                            ],
                            [
                                10618518.163134571,
                                3380136.455611689
                            ],
                            [
                                10459771.194890974,
                                3333609.717173103
                            ],
                            [
                                10302060.373030799,
                                3231578.7547737914
                            ],
                            [
                                10144728.339110792,
                                3246907.081177754
                            ],
                            [
                                9987722.436511468,
                                3270984.58569378
                            ],
                            [
                                9811490.07339748,
                                3242591.931530894
                            ],
                            [
                                9654582.689634614,
                                3261656.971525033
                            ],
                            [
                                9493757.483521974,
                                3283338.134496584
                            ],
                            [
                                9323099.078370603,
                                3406581.798462767
                            ],
                            [
                                9153235.6183134,
                                3513193.6491427044
                            ],
                            [
                                8995586.795376165,
                                3545286.4568448844
                            ],
                            [
                                8838016.108067846,
                                3645881.531339702
                            ],
                            [
                                8735501.313632712,
                                3820198.0685846023
                            ],
                            [
                                8772607.244363593,
                                3977407.1631136416
                            ],
                            [
                                8708536.877954645,
                                4145398.870247241
                            ],
                            [
                                8546305.230521556,
                                4253632.417008955
                            ],
                            [
                                8396053.8133217,
                                4411481.649823188
                            ],
                            [
                                8339606.766533726,
                                4580535.4443045035
                            ],
                            [
                                8195346.313750799,
                                4755488.747360497
                            ],
                            [
                                8319382.378149783,
                                4915585.311284464
                            ],
                            [
                                8485172.593899703,
                                4924799.562903349
                            ],
                            [
                                8647822.097087415,
                                5012620.750673421
                            ],
                            [
                                8810627.871532952,
                                5119119.7234723335
                            ],
                            [
                                8932551.726050325,
                                5279930.33937058
                            ],
                            [
                                8967198.083071051,
                                5436583.6381879
                            ],
                            [
                                8936944.30727578,
                                5593138.695174875
                            ],
                            [
                                9096347.784662314,
                                5677095.455873436
                            ],
                            [
                                9207110.13444942,
                                5837285.825246643
                            ],
                            [
                                9366776.045633066,
                                5938876.698959239
                            ],
                            [
                                9525112.801824868,
                                5964431.783581729
                            ],
                            [
                                9529596.25818395,
                                6122163.0612468785
                            ],
                            [
                                9659284.416174466,
                                6278867.677014277
                            ],
                            [
                                9817402.05288518,
                                6190560.447408135
                            ],
                            [
                                9974520.912426304,
                                6108148.307684779
                            ],
                            [
                                10097944.631298693,
                                5948922.237717595
                            ],
                            [
                                10133024.980780017,
                                5783130.496152119
                            ],
                            [
                                10275930.799561668,
                                5625675.819080985
                            ],
                            [
                                10434561.41366221,
                                5601993.650660001
                            ],
                            [
                                10595294.895340905,
                                5507750.855544889
                            ],
                            [
                                10677454.509143699,
                                5347659.63705741
                            ],
                            [
                                10840977.093054492,
                                5276625.650351191
                            ],
                            [
                                11033955.110465134,
                                5250400.613734745
                            ],
                            [
                                11209530.964436183,
                                5263642.630088294
                            ],
                            [
                                11403843.232640557,
                                5183640.456722712
                            ],
                            [
                                11560465.251497827,
                                5131439.201413201
                            ],
                            [
                                11727598.211044623,
                                5128868.108843532
                            ],
                            [
                                11886910.813297529,
                                5205354.351363306
                            ],
                            [
                                12047488.023718398,
                                5229968.01106466
                            ],
                            [
                                12210601.244877707,
                                5244606.305571869
                            ],
                            [
                                12381600.219455102,
                                5373862.288547568
                            ],
                            [
                                12404220.484025631,
                                5530516.792817638
                            ],
                            [
                                12562743.236986257,
                                5597325.510273571
                            ],
                            [
                                12727958.476423409,
                                5641921.080017848
                            ],
                            [
                                12890887.399414519,
                                5707819.582587653
                            ],
                            [
                                13065659.815288259,
                                5838944.716359099
                            ],
                            [
                                13223369.787848122,
                                5895958.858337585
                            ],
                            [
                                13253231.186898196,
                                6054743.723887828
                            ],
                            [
                                13095774.305831991,
                                6085943.878916476
                            ],
                            [
                                12925922.735979186,
                                6077282.547685879
                            ],
                            [
                                12922428.71448624,
                                6243668.573211697
                            ],
                            [
                                12985045.928057456,
                                6401032.7926343195
                            ],
                            [
                                13154870.320300205,
                                6389128.680435466
                            ],
                            [
                                13279763.328716297,
                                6550400.5681982
                            ],
                            [
                                13356451.749894498,
                                6708976.29541846
                            ],
                            [
                                13432225.47463422,
                                6873737.740864744
                            ],
                            [
                                13450810.713411605,
                                7031933.27803967
                            ],
                            [
                                13608372.907716783,
                                7067970.744754572
                            ],
                            [
                                13788742.212661628,
                                7072385.168333678
                            ],
                            [
                                13946227.96993852,
                                7010740.087327681
                            ],
                            [
                                14065062.069912538,
                                6853034.8519900255
                            ],
                            [
                                14114690.933777476,
                                6696482.5527306795
                            ],
                            [
                                14174664.275470339,
                                6537623.410317529
                            ],
                            [
                                14228670.433155073,
                                6376022.898968999
                            ],
                            [
                                14403684.899618383,
                                6347775.289601612
                            ],
                            [
                                14553627.171503844,
                                6178597.324424805
                            ],
                            [
                                14717638.952395659,
                                6059317.588102468
                            ],
                            [
                                14889134.76765691,
                                6148499.969354662
                            ],
                            [
                                14933430.874848483,
                                5982747.370461551
                            ],
                            [
                                14905859.189445708,
                                5821086.822961901
                            ],
                            [
                                14816534.87819165,
                                5657625.903268608
                            ],
                            [
                                14655517.730207983,
                                5642600.658984146
                            ],
                            [
                                14614576.359257814,
                                5479939.224245976
                            ],
                            [
                                14594675.55429361,
                                5317892.722832757
                            ],
                            [
                                14437639.926183289,
                                5226488.62013951
                            ],
                            [
                                14279566.453088915,
                                5166722.8342517875
                            ],
                            [
                                14122977.556943905,
                                5125302.530276883
                            ],
                            [
                                13965863.793204667,
                                4968679.923448064
                            ],
                            [
                                13805132.010126598,
                                4838812.190390718
                            ],
                            [
                                13646314.549956918,
                                4788778.310255778
                            ],
                            [
                                13485051.954182422,
                                4683380.616296992
                            ],
                            [
                                13529769.314329877,
                                4845799.104761506
                            ],
                            [
                                13361058.354799153,
                                4875634.684405029
                            ],
                            [
                                13203509.749299003,
                                4748822.542251546
                            ],
                            [
                                13241637.388307964,
                                4584861.3935001725
                            ],
                            [
                                13403452.029286738,
                                4538264.200420873
                            ],
                            [
                                13561125.481933087,
                                4503497.197567918
                            ],
                            [
                                13433060.33684316,
                                4336798.814592665
                            ],
                            [
                                13288235.94865155,
                                4179179.3508294635
                            ],
                            [
                                13411863.499599366,
                                3996881.0020572073
                            ],
                            [
                                13480820.74001668,
                                3831249.8172567994
                            ],
                            [
                                13322807.567244621,
                                3803156.3468538253
                            ],
                            [
                                13494750.114471182,
                                3713622.8057536525
                            ],
                            [
                                13455772.32584763,
                                3550410.0151050487
                            ],
                            [
                                13516967.81069274,
                                3391635.8611108144
                            ],
                            [
                                13451846.010494715,
                                3232881.7176394835
                            ],
                            [
                                13369121.611982925,
                                3076308.5561953913
                            ],
                            [
                                13318865.115185734,
                                2919206.1238387655
                            ],
                            [
                                13157403.7831377,
                                2827984.9734364874
                            ],
                            [
                                12997700.502740223,
                                2675006.193969905
                            ],
                            [
                                12826570.73591443,
                                2606222.6382485223
                            ],
                            [
                                12668031.84624783,
                                2590617.365991014
                            ],
                            [
                                12510702.360228766,
                                2481185.6423369935
                            ],
                            [
                                12354018.342448555,
                                2445093.976025343
                            ],
                            [
                                12196284.589479893,
                                2472365.9806569316
                            ],
                            [
                                12037501.950623097,
                                2458778.9569064216
                            ],
                            [
                                11877045.340846855,
                                2515227.193027054
                            ],
                            [
                                11717271.568523293,
                                2668877.66823336
                            ],
                            [
                                11557962.363471644,
                                2584653.8095342796
                            ],
                            [
                                11397879.445833685,
                                2584821.2493708995
                            ],
                            [
                                11328835.576784313,
                                2426839.8536956385
                            ],
                            [
                                11170407.096158572,
                                2454565.308581621
                            ],
                            [
                                11069885.60956105,
                                2616304.2990199253
                            ],
                            [
                                11008465.909432968,
                                2772925.320457184
                            ],
                            [
                                10870345.897922285,
                                2735347.9366305424
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                13326361.039759569,
                                3798375.405956135
                            ],
                            [
                                13326361.039759569,
                                3798375.405956135
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                13144444.309642104,
                                2807012.2378105703
                            ],
                            [
                                13144444.309642104,
                                2807012.2378105703
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                12304296.055549048,
                                2415574.96822675
                            ],
                            [
                                12304296.055549048,
                                2415574.96822675
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                13515234.388751296,
                                4773569.368999867
                            ],
                            [
                                13515234.388751296,
                                4773569.368999867
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                13492351.690383658,
                                3737156.407372601
                            ],
                            [
                                13492351.690383658,
                                3737156.407372601
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                13590629.325550852,
                                3542279.7176321656
                            ],
                            [
                                13590629.325550852,
                                3542279.7176321656
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                13577637.578643313,
                                3512121.481964032
                            ],
                            [
                                13577637.578643313,
                                3512121.481964032
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                13594699.172656879,
                                3463297.153901509
                            ],
                            [
                                13594699.172656879,
                                3463297.153901509
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                13484126.216839857,
                                3261411.4617933477
                            ],
                            [
                                13484126.216839857,
                                3261411.4617933477
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                13325005.556457978,
                                2928171.1785526783
                            ],
                            [
                                13325005.556457978,
                                2928171.1785526783
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                13076383.081056356,
                                2723657.3760866434
                            ],
                            [
                                13076383.081056356,
                                2723657.3760866434
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                13037237.130970573,
                                2689424.285346337
                            ],
                            [
                                13037237.130970573,
                                2689424.285346337
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                12646424.79695224,
                                2603838.065470662
                            ],
                            [
                                12646424.79695224,
                                2603838.065470662
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                12695954.292680405,
                                2551057.3172969264
                            ],
                            [
                                12695954.292680405,
                                2551057.3172969264
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                12706510.246286588,
                                2545919.47896461
                            ],
                            [
                                12706510.246286588,
                                2545919.47896461
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                12556124.639637075,
                                2460474.840047985
                            ],
                            [
                                12556124.639637075,
                                2460474.840047985
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                12447342.85818287,
                                2458413.2267742413
                            ],
                            [
                                12447342.85818287,
                                2458413.2267742413
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                12295857.407626364,
                                2398726.487495126
                            ],
                            [
                                12295857.407626364,
                                2398726.487495126
                            ]
                        ]
                    ],
                    [
                        [
                            [
                                12212148.670050325,
                                2060710.5609965434
                            ],
                            [
                                12134719.65899807,
                                2225015.534700209
                            ],
                            [
                                12302286.61100546,
                                2274774.9032253237
                            ],
                            [
                                12276466.18285073,
                                2115827.766227689
                            ],
                            [
                                12212148.670050325,
                                2060710.5609965434
                            ]
                        ]
                    ]
                ]
            },
            "properties": {
                "FIPS_CNTRY": "CH",
                "GMI_CNTRY": "CHN",
                "ISO_2DIGIT": "CN",
                "ISO_3DIGIT": "CHN",
                "CNTRY_NAME": "China",
                "LONG_NAME": "China",
                "SOVEREIGN": "China",
                "POP_CNTRY": 1281396894,
                "CURR_TYPE": "Renminbi Yuan",
                "CURR_CODE": "CNY",
                "LANDLOCKED": "N",
                "SQKM": 9367345,
                "SQMI": 3616732,
                "COLOR_MAP": "2",
                "RECID": 47
            }
        }
    ]
}
```

### Get all properties from a specific layer
GET: `/maps/{{map}}/groups/{{group}}/layers/{{layer}}/properties`

#### Example 1: Get all properties from a specific layer with filters
* GET: `http://localhost:3000/maps/Default/groups/Default/layers/cntry02/properties?limit=3&fields=CNTRY_NAME,LONG_NAME&from=4`

* Response:
```json
[
    {
        "CNTRY_NAME": "Belarus",
        "LONG_NAME": "Belarus"
    },
    {
        "CNTRY_NAME": "Canada",
        "LONG_NAME": "Canada"
    },
    {
        "CNTRY_NAME": "Germany",
        "LONG_NAME": "Germany"
    }
]
```

### Get a property values from a specific layer
GET: `/maps/{{map}}/groups/{{group}}/layers/{{layer}}/properties/{{field}}`

#### Example 1: Get a property values from a specific layer with supported filter
* GET: `http://localhost:3000/maps/Default/groups/Default/layers/cntry02/properties/CNTRY_NAME?limit=3&from=4`

* Response:
```json
[
    "Belarus",
    "Canada",
    "Germany"
]
```

#### Example 2: Get a property values from a specific layer
* GET: `http://localhost:3000/groups/Default/layers/cntry02/properties/CNTRY_NAME`

* Response:
```json
[
    "Finland",
    "Latvia",
    "Denmark",
    "Lithuania",
    "Belarus",
    "Canada",
    "Germany",
    "Netherlands",
    "Kazakhstan",
    "Poland",
    "Belgium",
    "Czech Republic",
    "Mongolia",
    "Luxembourg",
    "Ukraine",
    "Moldova",
    "Slovakia",
    "Austria",
    "Switzerland",
    "Liechtenstein",
    "Italy",
    "Slovenia",
    "Hungary",
    "France",
    "Romania",
    "San Marino",
    "Monaco",
    "Spain",
    "Georgia",
    "Bulgaria",
    "Kyrgyzstan",
    "Andorra",
    "Macedonia",
    "Turkmenistan",
    "Uzbekistan",
    "Vatican City",
    "Armenia",
    "Azerbaijan",
    "Tajikistan",
    "Albania",
    "Greece",
    "Portugal",
    "North Korea",
    "Turkey",
    "Afghanistan",
    "Pakistan",
    "China",
    "Syria",
    "Gibraltar",
    "Lebanon",
    "Algeria",
    "Morocco",
    "Libya",
    "West Bank",
    "Israel",
    "Saudi Arabia",
    "Iraq",
    "Gaza Strip",
    "Egypt",
    "Iran",
    "Jordan",
    "Kuwait",
    "Midway Is.",
    "Nepal",
    "Western Sahara",
    "Bhutan",
    "Qatar",
    "United Arab Emirates",
    "Niger",
    "Mauritania",
    "Laos",
    "Senegal",
    "Mali",
    "Honduras",
    "Eritrea",
    "Sudan",
    "Guatemala",
    "Burkina Faso",
    "Nicaragua",
    "Ethiopia",
    "El Salvador",
    "The Gambia",
    "Nigeria",
    "Chad",
    "Djibouti",
    "Cambodia",
    "Vietnam",
    "Costa Rica",
    "Sierra Leone",
    "Guinea",
    "Thailand",
    "Panama",
    "Ghana",
    "Benin",
    "Cote d'Ivory",
    "Central African Republic",
    "Liberia",
    "Togo",
    "Guyana",
    "Cameroon",
    "French Guiana",
    "Suriname",
    "Brazil",
    "Malaysia",
    "Somalia",
    "Gabon",
    "Equatorial Guinea",
    "Congo",
    "Uganda",
    "Ecuador",
    "Kenya",
    "Congo, DRC",
    "Rwanda",
    "Burundi",
    "Angola",
    "Tanzania",
    "Zambia",
    "Christmas I.",
    "Bolivia",
    "Malawi",
    "Peru",
    "Zimbabwe",
    "Namibia",
    "Argentina",
    "Paraguay",
    "Botswana",
    "Swaziland",
    "Lesotho",
    "South Africa",
    "Uruguay",
    "Greenland",
    "Russia",
    "Jan Mayen",
    "Norway",
    "United States",
    "Sweden",
    "Mexico",
    "Bangladesh",
    "The Bahamas",
    "Turks & Caicos Is.",
    "Myanmar",
    "Paracel Is.",
    "Colombia",
    "Guinea-Bissau",
    "Spratly Is.",
    "India",
    "Palau",
    "Micronesia",
    "Maldives",
    "Kiribati",
    "Howland I.",
    "Jarvis I.",
    "Tuvalu",
    "Tokelau",
    "Seychelles",
    "Glorioso Is.",
    "Wallis & Futuna",
    "Cook Is.",
    "French Southern & Antarctic Lands",
    "Bouvet I.",
    "Antarctica",
    "Svalbard",
    "Iceland",
    "Faroe Is.",
    "Estonia",
    "United Kingdom",
    "Isle of Man",
    "Ireland",
    "Guernsey",
    "Jersey",
    "St. Pierre & Miquelon",
    "Japan",
    "Croatia",
    "Malta",
    "South Korea",
    "Cyprus",
    "Tunisia",
    "Bermuda",
    "Bahrain",
    "Cuba",
    "Taiwan",
    "Dominican Republic",
    "Cayman Is.",
    "Wake I.",
    "Philippines",
    "British Virgin Is.",
    "Haiti",
    "Virgin Is.",
    "Puerto Rico",
    "Anguilla",
    "Jamaica",
    "Belize",
    "St. Kitts & Nevis",
    "Antigua & Barbuda",
    "Montserrat",
    "Johnston Atoll",
    "Guadeloupe",
    "Dominica",
    "Northern Mariana Is.",
    "Cape Verde",
    "Martinique",
    "St. Lucia",
    "Guam",
    "St. Vincent & the Grenadines",
    "Barbados",
    "Aruba",
    "Netherlands Antilles",
    "Grenada",
    "Venezuela",
    "Trinidad & Tobago",
    "Sri Lanka",
    "Marshall Is.",
    "Brunei",
    "Singapore",
    "Indonesia",
    "Sao Tome & Principe",
    "Baker I.",
    "Nauru",
    "Papua New Guinea",
    "British Indian Ocean Territory",
    "Solomon Is.",
    "Australia",
    "Comoros",
    "Cocos Is.",
    "Mayotte",
    "Samoa",
    "American Samoa",
    "Vanuatu",
    "St. Helena",
    "Madagascar",
    "Juan De Nova I.",
    "French Polynesia",
    "Fiji",
    "Niue",
    "Mauritius",
    "Reunion",
    "Tonga",
    "Mozambique",
    "New Caledonia",
    "Pitcairn Is.",
    "Norfolk I.",
    "New Zealand",
    "Chile",
    "Falkland Is.",
    "Heard I. & McDonald Is.",
    "South Georgia & the South Sandwich Is.",
    "Bosnia & Herzegovina",
    "Yugoslavia",
    "Oman",
    "Yemen",
    "East Timor"
]
```
