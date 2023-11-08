import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";


import { ImageList } from './components/ImageList';
import { PatientBioDataList } from './components/PatientBioDataList';

export default function App() {
  const mountRef = useRef(null);

  const patientsData = [
    {
      id: "TCGA_HT_7881_19981015",
      name: 'John Doe',
      age: 30,
      heartRate: 70,
      bloodPressure: '120/80'
    },
    // {
    //   id: 2,
    //   name: 'Jane Smith',
    //   age: 25,
    //   heartRate: 75,
    //   bloodPressure: '110/70'
    // },
  ];

  useEffect(() => {
    let container;
    let camera, scene, renderer;
    let controls;
    let animateId;

    // containerをrefから取得
    container = mountRef.current;
    
    // 初期化とアニメーション
    init();
    animate();

    // ウィンドウリサイズイベントリスナーを設定
    window.addEventListener('resize', onWindowResize);
    onWindowResize(); // 初期リサイズトリガー

    // クリーンアップ関数
    return () => {
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animateId);
      container.removeChild(renderer.domElement);
    };

    function init() {
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.shadowMap.enabled = true;
      container.appendChild(renderer.domElement);

      camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 2, 100);
      camera.position.set(0, 0, 15);

      controls = new TrackballControls(camera, renderer.domElement);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x999999);

      var loader = new PLYLoader();
      loader.load("models/brain_3d.ply", function(geometry) {
        geometry.computeVertexNormals();
        geometry.computeBoundingBox();

        var centroid = new THREE.Vector3();
        geometry.boundingBox.getCenter(centroid);
        geometry.translate(-centroid.x, -centroid.y, -centroid.z);

        var material = new THREE.PointsMaterial({
          size: 0.02,
          vertexColors: true
        });

        var points = new THREE.Points(geometry, material);
        points.scale.multiplyScalar(0.005);
        scene.add(points);
      });

      var axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      window.addEventListener("resize", onWindowResize, false);
    }

    function onWindowResize() {
      const width = window.innerWidth * 0.5;
      const height = window.innerHeight * 0.6;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }

    function animate() {
      animateId = requestAnimationFrame(animate);
      controls.update();
      render();
      
    }

    function render() {
      renderer.render(scene, camera);
    }
  }, []);

  // 親コンテナのスタイルを定義
  const bodyStyle = {
    display: 'flex',
    // flexDirection: 'row',
    // width: '100%',
    // height: '100vh',
    // margin: 0,
    // padding: 0,
  };

  return (
    <div style={bodyStyle}>
      <div>
        <ImageList />
        <PatientBioDataList patients={patientsData}/>
      </div>
      {/* <div style={{ flexBasis: '50%' }}>helloooooooooooooooo<br/>Sg</div> */}
      <div ref={mountRef} />
    </div>
  );
}
