<template>
    <div class="baidu-map">
        <!-- <div class="tools"><el-button @click="draw">划区域</el-button></div> -->
        <div id="container"></div>
        <div class="open-card" :style="outDetailStyle">
            <div style="display: flex;justify-content:space-between;align-items: center;">
                <div style="font-size: 18px;">{{ outDetailData }}</div>
                <div style="font-size: 12px;">2024-05-12 14:00:00</div>
            </div>
            <div style="margin-top: 15px;">
                矿井类型:类型1
            </div>
            <div style="margin-top: 15px;">
                瓦斯等级:等级1
            </div>
            <div style="margin-top: 15px;">
                测点数量:23
            </div>
        </div>
    </div>

</template>
<!-- eslint-disable no-undef -->
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

let map
function initialize() {
    map = new BMapGL.Map('container'); // 创建Map实例
    map.setMapType(BMAP_SATELLITE_MAP);  // .普通卫星地图
    map.centerAndZoom(new BMapGL.Point(105.50207636164727, 37.730147392772764), 12); // 初始化地图,设置中心点坐标和地图级别
    map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
}

const kuang1 = {
    label: '矿一',
    marker: {
        "lng": 105.50207636164727,
        "lat": 37.730147392772764
    },
    polygon: [
        {
            "lng": 11738165.207448883,
            "lat": 4516454.826354669,
            "latLng": {
                "lng": 105.44458480900863,
                "lat": 37.7406493746287
            }
        },
        {
            "lng": 11739701.207448881,
            "lat": 4519142.826637752,
            "latLng": {
                "lng": 105.45838278164189,
                "lat": 37.75982300452193
            }
        },
        {
            "lng": 11740661.207448883,
            "lat": 4521190.826852912,
            "latLng": {
                "lng": 105.46700651453769,
                "lat": 37.774428121325364
            }
        },
        {
            "lng": 11747125.207448883,
            "lat": 4520102.826738669,
            "latLng": {
                "lng": 105.52507298270265,
                "lat": 37.76666951521022
            }
        },
        {
            "lng": 11747509.207448881,
            "lat": 4518502.826570418,
            "latLng": {
                "lng": 105.52852247586097,
                "lat": 37.755258308997504
            }
        },
        {
            "lng": 11751285.207448881,
            "lat": 4516198.826327672,
            "latLng": {
                "lng": 105.56244249191774,
                "lat": 37.73882305334231
            }
        },
        {
            "lng": 11755573.207448881,
            "lat": 4519590.826684858,
            "latLng": {
                "lng": 105.60096183218559,
                "lat": 37.76301812237957
            }
        },
        {
            "lng": 11760757.207448883,
            "lat": 4519334.826657942,
            "latLng": {
                "lng": 105.64752998982286,
                "lat": 37.76119235778988
            }
        },
        {
            "lng": 11761781.207448883,
            "lat": 4516774.82638841,
            "latLng": {
                "lng": 105.65672863824503,
                "lat": 37.742932212335745
            }
        },
        {
            "lng": 11759669.207448881,
            "lat": 4513318.826023556,
            "latLng": {
                "lng": 105.63775642587429,
                "lat": 37.71827380794421
            }
        },
        {
            "lng": 11758453.207448883,
            "lat": 4510630.825739125,
            "latLng": {
                "lng": 105.62683303087296,
                "lat": 37.699089324465895
            }
        },
        {
            "lng": 11760565.207448883,
            "lat": 4506022.825250494,
            "latLng": {
                "lng": 105.6458052432437,
                "lat": 37.66618998761422
            }
        },
        {
            "lng": 11759669.207448881,
            "lat": 4503782.82501262,
            "latLng": {
                "lng": 105.63775642587429,
                "lat": 37.650191939607026
            }
        },
        {
            "lng": 11756597.207448883,
            "lat": 4503590.824992222,
            "latLng": {
                "lng": 105.61016048060777,
                "lat": 37.6488205165867
            }
        },
        {
            "lng": 11751093.207448883,
            "lat": 4503462.824978621,
            "latLng": {
                "lng": 105.56071774533858,
                "lat": 37.6479062203842
            }
        },
        {
            "lng": 11752437.207448883,
            "lat": 4507558.82541349,
            "latLng": {
                "lng": 105.57279097139269,
                "lat": 37.677158068250016
            }
        },
        {
            "lng": 11747061.207448883,
            "lat": 4510118.82568489,
            "latLng": {
                "lng": 105.52449806717627,
                "lat": 37.69543456930674
            }
        },
        {
            "lng": 11740981.207448883,
            "lat": 4507878.825447436,
            "latLng": {
                "lng": 105.46988109216962,
                "lat": 37.67944287926421
            }
        },
        {
            "lng": 11733813.207448883,
            "lat": 4510118.82568489,
            "latLng": {
                "lng": 105.40549055321439,
                "lat": 37.69543456930674
            }
        },
        {
            "lng": 11729525.207448883,
            "lat": 4515750.826280415,
            "latLng": {
                "lng": 105.36697121294654,
                "lat": 37.73562688175176
            }
        },
        {
            "lng": 11732149.207448883,
            "lat": 4518118.826529996,
            "latLng": {
                "lng": 105.39054274952836,
                "lat": 37.752519355343175
            }
        },
        {
            "lng": 11738165.207448883,
            "lat": 4516454.826354669,
            "latLng": {
                "lng": 105.44458480900863,
                "lat": 37.7406493746287
            }
        }
    ]
}

const kuang2 = {
    label: '矿二',
    marker: {
        "lng": 105.3727203682104,
        "lat": 37.78264222116325
    },
    polygon: [
        {
            "lng": 11735733.207448881,
            "lat": 4519270.826651214,
            "latLng": {
                "lng": 105.42273801900596,
                "lat": 37.7607359095411
            }
        },
        {
            "lng": 11731701.207448881,
            "lat": 4520294.826758837,
            "latLng": {
                "lng": 105.38651834084365,
                "lat": 37.7680387406509
            }
        },
        {
            "lng": 11725365.207448883,
            "lat": 4519014.826624288,
            "latLng": {
                "lng": 105.32960170373146,
                "lat": 37.75891008814073
            }
        },
        {
            "lng": 11723317.207448881,
            "lat": 4521958.8269334715,
            "latLng": {
                "lng": 105.3112044068871,
                "lat": 37.779904290158925
            }
        },
        {
            "lng": 11725301.207448883,
            "lat": 4524582.827208162,
            "latLng": {
                "lng": 105.32902678820507,
                "lat": 37.79861144681798
            }
        },
        {
            "lng": 11723509.207448881,
            "lat": 4525990.827355177,
            "latLng": {
                "lng": 105.31292915346626,
                "lat": 37.808647464244004
            }
        },
        {
            "lng": 11729781.207448883,
            "lat": 4526182.827375203,
            "latLng": {
                "lng": 105.36927087505208,
                "lat": 37.810015905514106
            }
        },
        {
            "lng": 11729333.207448883,
            "lat": 4524518.827201473,
            "latLng": {
                "lng": 105.36524646636738,
                "lat": 37.79815523153018
            }
        },
        {
            "lng": 11733813.207448883,
            "lat": 4525606.82731511,
            "latLng": {
                "lng": 105.40549055321439,
                "lat": 37.805910504978506
            }
        },
        {
            "lng": 11733109.207448883,
            "lat": 4524070.827154634,
            "latLng": {
                "lng": 105.39916648242415,
                "lat": 37.79496164495603
            }
        },
        {
            "lng": 11736821.207448883,
            "lat": 4524776.639180837,
            "latLng": {
                "lng": 105.43251158295453,
                "lat": 37.79999299160614
            }
        },
        {
            "lng": 11741749.207448883,
            "lat": 4525800.63928776,
            "latLng": {
                "lng": 105.47678007848624,
                "lat": 37.807291912085
            }
        },
        {
            "lng": 11741749.207448883,
            "lat": 4525224.6392276315,
            "latLng": {
                "lng": 105.47678007848624,
                "lat": 37.80318635882491
            }
        },
        {
            "lng": 11735733.207448881,
            "lat": 4519270.826651214,
            "latLng": {
                "lng": 105.42273801900596,
                "lat": 37.7607359095411
            }
        }
    ]
}

const kuang3 = {
    label: '矿三',
    marker: {
        "lng": 105.58371436639402,
        "lat": 37.81184045409009
    },
    polygon: [
        {
            "lng": 11745589.207448883,
            "lat": 4524518.827201473,
            "latLng": {
                "lng": 105.5112750100694,
                "lat": 37.79815523153018
            }
        },
        {
            "lng": 11746357.207448883,
            "lat": 4521830.826920051,
            "latLng": {
                "lng": 105.51817399638603,
                "lat": 37.77899162376275
            }
        },
        {
            "lng": 11749429.207448883,
            "lat": 4520742.826805887,
            "latLng": {
                "lng": 105.54576994165255,
                "lat": 37.77123350058733
            }
        },
        {
            "lng": 11749493.207448883,
            "lat": 4518886.826610822,
            "latLng": {
                "lng": 105.54634485717894,
                "lat": 37.7579971603976
            }
        },
        {
            "lng": 11754101.207448883,
            "lat": 4520294.826758837,
            "latLng": {
                "lng": 105.58773877507872,
                "lat": 37.7680387406509
            }
        },
        {
            "lng": 11757365.207448883,
            "lat": 4521190.826852912,
            "latLng": {
                "lng": 105.6170594669244,
                "lat": 37.774428121325364
            }
        },
        {
            "lng": 11757621.207448883,
            "lat": 4524518.827201473,
            "latLng": {
                "lng": 105.61935912902995,
                "lat": 37.79815523153018
            }
        },
        {
            "lng": 11765237.207448883,
            "lat": 4526374.827395223,
            "latLng": {
                "lng": 105.68777407666987,
                "lat": 37.81138432120871
            }
        },
        {
            "lng": 11760757.207448883,
            "lat": 4528934.827661643,
            "latLng": {
                "lng": 105.64752998982286,
                "lat": 37.829627419777424
            }
        },
        {
            "lng": 11753717.207448883,
            "lat": 4530982.82787404,
            "latLng": {
                "lng": 105.5842892819204,
                "lat": 37.84421862445786
            }
        },
        {
            "lng": 11751413.207448881,
            "lat": 4533926.828178119,
            "latLng": {
                "lng": 105.5635923229705,
                "lat": 37.86518838156772
            }
        },
        {
            "lng": 11750901.207448883,
            "lat": 4528230.827588475,
            "latLng": {
                "lng": 105.55899299875942,
                "lat": 37.8246110209713
            }
        },
        {
            "lng": 11748981.207448883,
            "lat": 4528166.827581821,
            "latLng": {
                "lng": 105.54174553296785,
                "lat": 37.82415496766353
            }
        },
        {
            "lng": 11746421.207448883,
            "lat": 4527654.827528557,
            "latLng": {
                "lng": 105.51874891191241,
                "lat": 37.82050643888807
            }
        },
        {
            "lng": 11746869.207448883,
            "lat": 4526246.827381877,
            "latLng": {
                "lng": 105.52277332059711,
                "lat": 37.81047204692071
            }
        },
        {
            "lng": 11749813.207448883,
            "lat": 4524710.827221538,
            "latLng": {
                "lng": 105.54921943481087,
                "lat": 37.79952386886922
            }
        },
        {
            "lng": 11748021.207448881,
            "lat": 4524390.827188094,
            "latLng": {
                "lng": 105.53312180007205,
                "lat": 37.797242792430296
            }
        },
        {
            "lng": 11745589.207448883,
            "lat": 4524518.827201473,
            "latLng": {
                "lng": 105.5112750100694,
                "lat": 37.79815523153018
            }
        }
    ]
}

const kuang4 = {
    label: '矿四',
    marker: {
        "lng": 105.7556141087834,
        "lat": 37.73425705132826
    },
    polygon: [
        {
            "lng": 11767800.977624027,
            "lat": 4508707.653097777,
            "latLng": {
                "lng": 105.71080456541635,
                "lat": 37.68536040665256
            }
        },
        {
            "lng": 11769784.977624027,
            "lat": 4517859.654065155,
            "latLng": {
                "lng": 105.72862694673432,
                "lat": 37.7506707004252
            }
        },
        {
            "lng": 11772408.977624027,
            "lat": 4519267.654213328,
            "latLng": {
                "lng": 105.75219848331614,
                "lat": 37.760713283630245
            }
        },
        {
            "lng": 11773304.977624025,
            "lat": 4523555.654663187,
            "latLng": {
                "lng": 105.76024730068553,
                "lat": 37.79128904477135
            }
        },
        {
            "lng": 11777208.977624025,
            "lat": 4526307.654950666,
            "latLng": {
                "lng": 105.79531714779507,
                "lat": 37.810905575066386
            }
        },
        {
            "lng": 11782328.977624027,
            "lat": 4526883.655010702,
            "latLng": {
                "lng": 105.84131038990596,
                "lat": 37.81501069553822
            }
        },
        {
            "lng": 11784184.977624027,
            "lat": 4525283.654843819,
            "latLng": {
                "lng": 105.85798294017114,
                "lat": 37.80360701477291
            }
        },
        {
            "lng": 11783672.977624027,
            "lat": 4520995.654394875,
            "latLng": {
                "lng": 105.85338361596006,
                "lat": 37.77303639308789
            }
        },
        {
            "lng": 11779960.977624027,
            "lat": 4520419.654334396,
            "latLng": {
                "lng": 105.82003851542967,
                "lat": 37.768928920031556
            }
        },
        {
            "lng": 11776504.977624027,
            "lat": 4518947.654179672,
            "latLng": {
                "lng": 105.78899307700483,
                "lat": 37.758430999074555
            }
        },
        {
            "lng": 11775608.977624027,
            "lat": 4517091.653984249,
            "latLng": {
                "lng": 105.78094425963543,
                "lat": 37.74519234834255
            }
        },
        {
            "lng": 11774776.977624027,
            "lat": 4514211.653680356,
            "latLng": {
                "lng": 105.77347035779242,
                "lat": 37.72464488569748
            }
        },
        {
            "lng": 11773752.977624027,
            "lat": 4509924.83567979,
            "latLng": {
                "lng": 105.76427170937025,
                "lat": 37.694049783764974
            }
        },
        {
            "lng": 11772600.977624025,
            "lat": 4507172.835387994,
            "latLng": {
                "lng": 105.75392322989529,
                "lat": 37.67440199205342
            }
        },
        {
            "lng": 11769400.977624025,
            "lat": 4506404.835306495,
            "latLng": {
                "lng": 105.725177453576,
                "lat": 37.66891795067403
            }
        },
        {
            "lng": 11767352.977624027,
            "lat": 4507172.835387994,
            "latLng": {
                "lng": 105.70678015673165,
                "lat": 37.67440199205342
            }
        },
        {
            "lng": 11767800.977624027,
            "lat": 4508707.653097777,
            "latLng": {
                "lng": 105.71080456541635,
                "lat": 37.68536040665256
            }
        }
    ]
}

const kuang5 = {
    label: '矿五',
    marker: {
        "lng": 105.46873126111684,
        "lat": 37.61955740843386
    },
    polygon: [
        {
            "lng": 11732169.872022275,
            "lat": 4500455.274342365,
            "latLng": {
                "lng": 105.39072838052975,
                "lat": 37.62642020515463
            }
        },
        {
            "lng": 11732361.827047823,
            "lat": 4503718.5101234615,
            "latLng": {
                "lng": 105.39245272310093,
                "lat": 37.649732552294644
            }
        },
        {
            "lng": 11736072.957541741,
            "lat": 4504742.270368458,
            "latLng": {
                "lng": 105.42579001281027,
                "lat": 37.65704470954681
            }
        },
        {
            "lng": 11740423.93812082,
            "lat": 4503078.659970324,
            "latLng": {
                "lng": 105.46487511109021,
                "lat": 37.645162085266875
            }
        },
        {
            "lng": 11743815.143572157,
            "lat": 4504550.315322525,
            "latLng": {
                "lng": 105.49533849651425,
                "lat": 37.655673735375494
            }
        },
        {
            "lng": 11747556.13009385,
            "lat": 4500779.47237238,
            "latLng": {
                "lng": 105.52894398456614,
                "lat": 37.628736585118695
            }
        },
        {
            "lng": 11748881.068967583,
            "lat": 4495850.898510187,
            "latLng": {
                "lng": 105.54084598347272,
                "lat": 37.59351429347478
            }
        },
        {
            "lng": 11749904.829103835,
            "lat": 4492011.7975912485,
            "latLng": {
                "lng": 105.55004247718563,
                "lat": 37.56606631818672
            }
        },
        {
            "lng": 11741074.897928648,
            "lat": 4494955.1082957415,
            "latLng": {
                "lng": 105.47072271891167,
                "lat": 37.58711067871453
            }
        },
        {
            "lng": 11738579.48259653,
            "lat": 4494251.27312726,
            "latLng": {
                "lng": 105.44830626548642,
                "lat": 37.58207887731333
            }
        },
        {
            "lng": 11733780.606957842,
            "lat": 4495403.003402964,
            "latLng": {
                "lng": 105.40519770120709,
                "lat": 37.5903125555523
            }
        },
        {
            "lng": 11736723.917349571,
            "lat": 4498410.299122921,
            "latLng": {
                "lng": 105.43163762063175,
                "lat": 37.61180727364833
            }
        },
        {
            "lng": 11734932.337111127,
            "lat": 4500009.924505878,
            "latLng": {
                "lng": 105.41554375663414,
                "lat": 37.62323808242679
            }
        },
        {
            "lng": 11733652.63694081,
            "lat": 4500841.729705004,
            "latLng": {
                "lng": 105.40404813949299,
                "lat": 37.629181402554394
            }
        },
        {
            "lng": 11732169.872022275,
            "lat": 4500455.274342365,
            "latLng": {
                "lng": 105.39072838052975,
                "lat": 37.62642020515463
            }
        }
    ]
}

const outDetailStyle = reactive({
    top: 0,
    left: 0,
    display: 'none'
})
const outDetailData = ref(null)



// 添加覆盖物
function addOverlay(data) {
    const marker = new BMapGL.Marker(new BMapGL.Point(data.marker.lng, data.marker.lat))
    // map.addOverlay(marker); // 增加点
    console.log(data.polygon);
    const polygon = new BMapGL.Polygon(data.polygon.map(point => new BMapGL.Point(point.latLng.lng, point.latLng.lat)), {
        strokeColor: "#356cdc", // 边线颜色
        fillColor: "#356cdc", // 填充颜色。当参数为空时，圆形没有填充颜色
        strokeWeight: 4, // 边线宽度，以像素为单位
        strokeOpacity: 1, // 边线透明度，取值范围0-1
        fillOpacity: 0.2, // 填充透明度，取值范围0-1
    })

    map.addOverlay(polygon); // 增加面
    polygon.addEventListener('click', function () {
        // router.push('/flielist')
    });
    polygon.addEventListener('mousemove', function (event) {
        outDetailStyle.display = 'block'
        outDetailStyle.top = (event.pixel.y - 165) + 'px'
        outDetailStyle.left = (event.pixel.x + 10) + 'px'
        outDetailData.value = data.label
    });

    polygon.addEventListener('mouseout', function (event) {
        console.log(event);
        outDetailStyle.display = 'none'
    });
    // 创建文本标注对象
    var label = new BMapGL.Label(data.label, {
        position: new BMapGL.Point(data.marker.lng, data.marker.lat), // 指定文本标注所在的地理位置
        offset: new BMapGL.Size(0, 0) // 设置文本偏移量
    })
    label.setStyle({
        color: "#000",
    })
    // map.addOverlay(label);


    // const customOverlay = new BMapGL.CustomOverlay(createDOM, {
    //     point: new BMapGL.Point(116.40342230333138, 39.92498414216742),
    //     opacity: 0.5,
    //     map: map,
    //     offsetY: -10,
    //     properties: {
    //         title: 'this is a title',
    //         size: '100'
    //     }
    // });
    // map.addOverlay(customOverlay)
}
var styleOptions = {
    strokeColor: "#5E87DB", // 边线颜色
    fillColor: "#5E87DB", // 填充颜色。当参数为空时，圆形没有填充颜色
    strokeWeight: 2, // 边线宽度，以像素为单位
    strokeOpacity: 1, // 边线透明度，取值范围0-1
    fillOpacity: 0.2, // 填充透明度，取值范围0-1
};
var labelOptions = {
    borderRadius: "2px",
    background: "#FFFBCC",
    border: "1px solid #E1E1E1",
    color: "#703A04",
    fontSize: "12px",
    letterSpacing: "0",
    padding: "5px",
};
let drawingManager
function initDrawingManager() {
    // 实例化鼠标绘制工具
    drawingManager = new BMapGLLib.DrawingManager(map, {
        // isOpen: true,        // 是否开启绘制模式
        enableCalculate: false, // 绘制是否进行测距测面
        enableSorption: true, // 是否开启边界吸附功能
        sorptiondistance: 20, // 边界吸附距离
        circleOptions: styleOptions, // 圆的样式
        polylineOptions: styleOptions, // 线的样式
        polygonOptions: styleOptions, // 多边形的样式
        rectangleOptions: styleOptions, // 矩形的样式
        labelOptions: labelOptions, // label样式
    });

    drawingManager.addEventListener("polygoncomplete", function (e) {
        console.log(e.getPoints());
    });
}

function draw() {
    var drawingType = BMAP_DRAWING_POLYGON;
    // 进行绘制
    if (
        drawingManager._isOpen &&
        drawingManager.getDrawingMode() === drawingType
    ) {
        drawingManager.close();
    } else {
        drawingManager.setDrawingMode(drawingType);
        drawingManager.open();
    }
    console.log(drawingManager);
}

onMounted(() => {
    initialize()
    initDrawingManager()
    addOverlay(kuang1)
    addOverlay(kuang2)
    addOverlay(kuang3)
    addOverlay(kuang4)
    addOverlay(kuang5)
    map.addEventListener('click', function (e) {
        // alert('点击位置经纬度：' + e.latlng.lng + ',' + e.latlng.lat);
    });
})
</script>

<style lang="scss" scoped>
.baidu-map {
    height: 100%;
    width: 100%;
    position: relative;
}

#container {
    position: absolute;
    inset: 0;
}

.tools {
    position: fixed;
    bottom: 200px;
    left: 500px;
    z-index: 999;
    color: #5E87DB;
    color: #356cdc;
}

.open-card {
    width: 320px;
    height: 164px;
    color: #fff;
    position: absolute;
    z-index: 100;
    background: url('@/assets/texture/piont-card.png') no-repeat;
    background-size: 100% 100%;
    padding: 12px 23px;
}
</style>