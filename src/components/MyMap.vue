<template>
    <div id="scene-page">
        <div class="map-main-view" ref="container"></div>

        <div class="open-card" :style="outDetailStyle" v-if="isOpenCard()">
            <div style="display: flex;">
                <div style="display: flex;flex-direction: column;align-items: center;">
                    <div style="font-size: 18px;margin-bottom: 15px; white-space:nowrap;">
                        {{ outDetailData.name }}</div>
                    <img :src="Radar" alt="" style="height: 78px;width: 78px;">
                    <div> &nbsp;</div>
                </div>
                <div id="chart" style="flex:1 0 0;"></div>
            </div>
        </div>
    </div>
</template>

<script setup name="MyMap">
import * as THREE from 'three';
import { MapControls } from 'three/examples/jsm/controls/MapControls.js';
import * as dat from 'dat.gui';
import { gsap } from "gsap";
import { reactive, onMounted, onUnmounted, ref } from 'vue';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { ElMessage } from 'element-plus'
import eCardBg from '@/assets/texture/e-card.png'
import * as echarts from "echarts";
import Stone1 from '@/assets/texture/stone1.png'
import Stone2 from '@/assets/texture/stone2.png'
import { useRouter } from 'vue-router'
import axios from 'axios'
import PointPic1 from '@/assets/texture/point-1.png'
import PointPic2 from '@/assets/texture/point-2.png'
import PointPic3 from '@/assets/texture/point-3.png'
import PointPic4 from '@/assets/texture/point-4.png'
import PointPic5 from '@/assets/texture/point-5.png'
import _ from 'lodash';
import mapInfo from "@/utils/map-info.js"
import Radar from '@/assets/texture/radar.gif'
import cadmapData from '@/assets/data/cadmap';
import pointsData from '@/assets/data/points';
import workfaceData from '@/assets/data/workface';

const props = defineProps({
})

let myChart, option

// 纹理加载器
const textureLoader = new THREE.TextureLoader();

let scene, camera, renderer, labelRenderer, controls
function initScene() {
    // 创建场景
    scene = new THREE.Scene();
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1200);
    // 设定相机位置和观察位置
    camera.position.z = 180;
    camera.position.y = 520
    camera.lookAt(0, 0, 0)
    scene.background = null; // 背景透明
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({
        antialias: true, // 抗锯齿
        alpha: true,
    });
    // renderer.localClippingEnabled = true
    labelRenderer = new CSS2DRenderer();
    controls = new MapControls(camera, labelRenderer.domElement);
}
initScene()


let offsetTop = 0 //appMain.offsetTop // 84
let offsetLeft = 0 //mainContainer.offsetLeft200 // 200


// 引入挂载DOM的ref
const container = ref()

function initLight() {
    // 加入环境光
    const ambientlight = new THREE.AmbientLight(0x404040); // 柔和的白光
    scene.add(ambientlight);
    // 平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position = THREE.Object3D.DEFAULT_UP

    scene.add(directionalLight);
}

initLight()

function getAllLineModel() {
    const group = new THREE.Group();
    group.name = '巷道'
    cadmapData().forEach(element => {
        createTunnel(group, element)
    });
    scene.add(group)
}

function createTunnel(group, data) {
    const raidus = data.width // 半径
    const tubeColor = data.color ? new THREE.Color(data.color) : new THREE.Color('#e6e6e6')

    const sphereMaterial = new THREE.MeshPhongMaterial({
        color: tubeColor,
        shininess: 100,
        // depthTest: false
    });
    const tubeMaterial = new THREE.MeshPhongMaterial({
        color: tubeColor,
        shininess: 100,
        // depthTest: false
    });
    const points = [new THREE.Vector3(mapInfo.cadToWeb3dX(data.startX), 0, mapInfo.cadToWeb3dY(data.startY)), new THREE.Vector3(mapInfo.cadToWeb3dX(data.endX), 0, mapInfo.cadToWeb3dY(data.endY))]
    // 创建封口两个球面
    const sphereGeo = new THREE.SphereGeometry(raidus, 32, 16);
    const sphere1 = new THREE.Mesh(sphereGeo, sphereMaterial);
    // sphere1.renderOrder = 0
    const sphere2 = sphere1.clone();
    sphere1.position.set(points[0].x, points[0].y, points[0].z);
    sphere2.position.set(points[1].x, points[1].y, points[1].z)
    group.add(sphere1);
    group.add(sphere2);
    // 创建曲线
    const curve = new THREE.CatmullRomCurve3(points);
    curve.curveType = "catmullrom";
    curve.closed = false;//设置是否闭环
    curve.tension = 0; //设置线的张力，0为无弧度折线
    const geometry = new THREE.TubeGeometry(curve, 2, raidus, 16, false);
    const tube = new THREE.Mesh(geometry, tubeMaterial);
    // tube.renderOrder = 1
    tube.userData = data
    group.add(tube);
}

let pointList = []
function initCheckPoints() {
    pointsData().forEach((item, index) => {
        pointList[index] = createPointModel(item)
        scene.add(pointList[index])
    })

}

// 屏幕点模型
function createPointModel(item, dialog = true) {
    const vertices = [0, 0, 0]
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({
        transparent: true,
        opacity: 0 // 透明度为0
    });
    const point = new THREE.Points(geometry, material);
    point.name = 'point'
    point.userData = item
    point.position.set(mapInfo.cadToWeb3dX(item.posX), 0, mapInfo.cadToWeb3dY(item.posY))
    let css2Model = create2DPointModel(item, dialog)
    css2Model.name = 'pointModel'
    point.add(css2Model)
    return point
}

function create2DPointModel(item, dialog = true) {
    const pointPics = [PointPic1, PointPic2, PointPic3, PointPic4, PointPic5]
    let laberDiv = document.createElement('div');//创建div容器
    laberDiv.className = 'p-model';
    const html = `<div style="background: url(${pointPics[item.inspecStatus]}) no-repeat; background-size: 100% 100%; width: 124px; height: 106px;padding: 8px 2px;box-sizing: border-box;overflow: hidden;white-space: nowrap;text-overflow:ellipsis; text-align: center;font-size: 12px; color: #fff;">
        ${item.name}
    </div>`
    laberDiv.innerHTML = html
    let pointLabel = new CSS2DObject(laberDiv);
    pointLabel.position.set(0, 0, 0); // 在父元素的相对位置
    pointLabel.center.set(0.5, 1); // DOM元素中心点位置（1，1）=（100%，100%）
    laberDiv.addEventListener('mouseenter', function (event) {
        if (dialog) {
            showOutDetail(event, item)
        }
    })
    laberDiv.addEventListener('mousemove', function (event) {
        if (dialog) {
            showOutDetail(event, item)
        }
    })
    laberDiv.addEventListener('mouseleave', function () {
        // console.log('离开');
        if (dialog) {
            hiddenOutDetail()
        }
    })
    return pointLabel;
}
function hiddenOutDetail() {
    outDetailStyle.display = 'none'
}
const outDetailStyle = reactive({
    top: 0,
    left: 0,
    display: 'none'
})
const outDetailData = ref(null)
function isOpenCard() {
    if (outDetailData.value) {
        return true
    } else {
        return false
    }
}
// let currentChartId = ''

function showOutDetail(event, object) {
    outDetailStyle.display = 'block'
    // outDetailStyle.top = event.clientY > (offsetTop + 210) ? (event.clientY - offsetTop) - 220 + 'px' : 0 + 'px'
    // outDetailStyle.left = (event.clientX - offsetLeft + 10) + 'px'
    outDetailStyle.top = (event.clientY - offsetTop - 165) + 'px'
    outDetailStyle.left = (event.clientX - offsetLeft + 10) + 'px'
    outDetailData.value = object
    // if (currentChartId === object.id || chartLoading.value) return
    // currentChartId = object.id
    if (myChart) {
        myChart.dispose()
        myChart = undefined
    }

    const data = {
        labels: ['01', '02', '03', '04', '05', '06', '07'],
        data: [{
            name: '瓦斯',
            data: [4, 2, 3, 6, 2, 1, 7]
        }],
    }

    setTimeout(() => {
        initChart(data)
        myChart.resize()
    }, 0);
}

/**
 * 图表显示
 * @param {{ labels: string[], data:{ name:string, data:number[] } [] }} data 
 */
function initChart(data) {
    if (data.data.length === 0) return
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById('chart'));
    const clone = _.cloneDeep(data.data)
    clone.forEach(item => {
        item.type = 'line'
        item.showSymbol = false
        item.smooth = true
    })

    const legend = data.data.map(item => item.name)

    // 指定图表的配置项和数据
    option = {
        xAxis: {
            type: 'category',
            data: data.labels,
            axisLabel: {
                color: '#fff',  //坐标的字体颜色
                fontSize: 10
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',  //坐标轴的颜色
                    width: 0.5
                },
            },
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#fff',  //坐标的字体颜色
                fontSize: 10
            },
            axisLine: {
                lineStyle: {
                    color: '#fff',  //坐标轴的颜色
                    width: 0.5
                },
            },
            splitLine: {
                lineStyle: {
                    color: '#fff',
                    width: 0.5,
                    type: 'dotted'
                }
            }
        },
        legend: {
            data: legend,
            icon: 'circle',
            itemGap: 10,
            itemHeight: 8,
            align: 'left',
            itemWidth: 8,
            textStyle: {
                padding: [0, 0, 0, 0],
                color: '#fff',
                fontSize: 8
            },
            top: 0,
        },
        grid: {
            top: 30,
            left: 20,
            right: 5,
            bottom: 20,
        },
        series: clone
    };

    // // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
const areaData = ref([])
// 获取工作面数据
async function getAreaData() {
    areaData.value = workfaceData().map(item => {
        item.points = JSON.parse(item.points)
        item.points.forEach(item => {
            item.x = mapInfo.cadToWeb3dX(item.x)
            item.z = mapInfo.cadToWeb3dY(item.z)
        })
        return item
    })
    areaData.value.forEach((item) => {
        initMineFace(item)
    })

}
let mineFaceGroup = new THREE.Group();
mineFaceGroup.name = 'mineFace'
mineFaceGroup.rotation.x = Math.PI / 2 // 图纸旋转90度
mineFaceGroup.position.y = 1
scene.add(mineFaceGroup)
// 配置工作面纹理素材
const areaTexture1 = textureLoader.load(Stone1);
areaTexture1.colorSpace = THREE.SRGBColorSpace
areaTexture1.wrapS = areaTexture1.wrapT = THREE.RepeatWrapping;
areaTexture1.repeat.set(0.02, 0.02);
areaTexture1.offset.set(0.5, 0.5)

const areaTexture2 = textureLoader.load(Stone2);
areaTexture2.colorSpace = THREE.SRGBColorSpace
areaTexture2.wrapS = areaTexture2.wrapT = THREE.RepeatWrapping;
areaTexture2.repeat.set(0.02, 0.02);
areaTexture2.offset.set(0.5, 0.5)

// 建立工作面模型
function initMineFace(data) {
    const shape = new THREE.Shape();
    let maxX, minX, maxZ, minZ
    data.points.forEach((item, index) => {
        if (index === 1) {
            maxX = item.x
            minX = item.x
            maxZ = item.z
            minZ = item.z
            shape.moveTo(item.x, item.z);
        } else {
            shape.lineTo(item.x, item.z)
            if (maxX < item.x) {
                maxX = item.x
            }
            if (minX > item.x) {
                minX = item.x
            }
            if (maxZ < item.z) {
                maxZ = item.z
            }
            if (minZ > item.z) {
                minZ = item.z
            }
        }
    })
    const xLength = maxX - minX
    const zLength = maxZ - minZ
    //计算中心点
    const center = [maxX - xLength / 2, maxZ - zLength / 2]

    shape.lineTo(data.points[0].x, data.points[0].z) // 闭合路径

    let texture
    if (data.fenceType === 1) {
        texture = areaTexture1
    } else if (data.fenceType === 2) {
        texture = areaTexture2
    }
    // 创建形状的几何体
    const geometry = new THREE.ShapeGeometry(shape);
    const material = new THREE.MeshBasicMaterial({
        map: texture,
        // transparent: true,
        // opacity: 0.6, // 透明度为0
        side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    const css2Obj = createAreaLableObj(data.name, center)
    mesh.name = 'faceObj'
    mesh.add(css2Obj) //
    mineFaceGroup.add(mesh)
}


// 新建标签
function createAreaLableObj(text, center) {
    let laberDiv = document.createElement('div');//创建div容器
    // laberDiv.textContent = text;
    // laberDiv.style.color = '#409eff'
    const html = `
        <div style="color:#fff; font-family: 'PangMenZhengDao';font-size: 20px;">${text}</div>`
    laberDiv.innerHTML = html

    let label = new CSS2DObject(laberDiv);
    label.position.set(center[0], center[1], 0);
    label.center.set(0.5, 0.5);
    return label;
}

function init() {
    getAllLineModel()
    initCheckPoints()
    getAreaData()
}
init()

// 建立时钟对象
const clock = new THREE.Clock();//计时器
const FPS = 60; // 指的是 60帧每秒的情况
const singleFrameTime = (1 / FPS);
let timeStamp = 0;
// 动画函数
function animate() {
    requestAnimationFrame(animate);

    const delta = clock.getDelta(); //获取距离上次请求渲染的时间

    timeStamp += delta;

    if (timeStamp > singleFrameTime) {
        render();//渲染
        // 剩余的时间合并进入下次的判断计算 这里使用取余数是因为 当页页面失去焦点又重新获得焦点的时候，delta数值会非常大， 这个时候就需要
        timeStamp = (timeStamp % singleFrameTime);
    }
    // composer.render();
}

function render() {

    renderer.render(scene, camera);

    labelRenderer.render(scene, camera);
}

// 改变屏幕尺寸调整3D比例
async function resizeView() {
    if (!container.value) return
    // 更新摄像头
    camera.aspect = container.value.clientWidth / container.value.clientHeight
    // 更新投影几的投影矩阵
    camera.updateProjectionMatrix()
    // 更新渲染器尺寸
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
    // 设置当前设备的像素比,pc和移动端区别
    renderer.setPixelRatio(window.devicePixelRatio)

    labelRenderer.setSize(container.value.clientWidth, container.value.clientHeight);
    // composer.setSize( container.value.clientWidth, container.value.clientHeight );
}

// 挂载生命周期
onMounted(() => {
    offsetTop = container.value.getBoundingClientRect().top
    offsetLeft = container.value.getBoundingClientRect().left

    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
    labelRenderer.setSize(container.value.clientWidth, container.value.clientHeight);
    // composer.setSize( container.value.clientWidth, container.value.clientHeight );

    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    container.value.appendChild(renderer.domElement)
    container.value.appendChild(labelRenderer.domElement);

    // 垂直旋转的角度的上限
    controls.maxPolarAngle = Math.PI / 3
    // 水平旋转的角度的上限
    controls.minAzimuthAngle = -Math.PI / 2
    controls.maxAzimuthAngle = Math.PI / 2
    // 垂直旋转的角度的上限
    controls.maxDistance = 600
    controls.minDistance = 10

    // 控制器改变事件
    controls.addEventListener('change', function (event) {
        if (!props.editMode) {
            if (controls.target.x < -600 || controls.target.x > 600 || controls.target.z < -200 || controls.target.z > 400) {
                controls.reset()
            } else {
                controls.saveState();
            }
            // nearValue = controls.getDistance()
            // mergePointData(pointList)
        }

    })

    // gui移入当前vue

    window.addEventListener('resize', resizeView)

    resizeView()

    animate()

    // container.value.addEventListener('mousemove', handleMousemoveScene)
})
onUnmounted(() => {
})

defineExpose({
});
</script>

<style lang="scss" scoped>
#scene-page {
    position: relative;
    height: 100%;

    .map-main-view {
        height: 100%;
    }

    .fixed-left {
        position: absolute;
        top: 0px;
        left: 0px;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    .fixed-right {
        position: absolute;
        top: 0px;
        right: 0px;
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    .fixd-center {
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(-50%, -50%);
    }
}

ul,
li {
    list-style: none;
    padding: 0px;
    margin: 0px;
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

.air-card {
    height: 200px;
    min-width: 320px;
    color: #fff;
    position: absolute;
    z-index: 25;
    background: url('@/assets/texture/piont-card.png') no-repeat;
    background-size: 100% 100%;
    padding: 12px 23px;
}

// gui 样式
:deep(#gui) {
    position: absolute;
    top: 0;
    right: 0;
    mix-blend-mode: difference;
}
</style>
