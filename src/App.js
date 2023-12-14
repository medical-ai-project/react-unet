import React, { useEffect, useRef } from 'react';
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { PLYLoader } from "three/examples/jsm/loaders/PLYLoader";


import { ImageList } from './components/ImageList';
import { PatientBioDataList } from './components/PatientBioDataList';
import { CamPage } from './components/CamPage';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  const mountRef = useRef(null);
  const pointsRef = useRef();

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
  const updateScene = (selectedZValue) => {
    // 現在の点群オブジェクトの参照を取得
    const points = pointsRef.current;
    if (!points) return;

    const positions = points.geometry.attributes.position.array;
    const colors = points.geometry.attributes.color.array;

    // originalColorsは、PLYファイルから読み込んだ後に設定される
    // 3つの要素（R, G, B）を持つ配列
    const originalColors = points.geometry.userData.originalColors;
    console.log(originalColors)

    // すべての点に対して色を更新
    for (let i = 0; i < positions.length; i += 3) {
      let vertexIndex = i / 3;

      if (positions[i + 2] === selectedZValue) {
        // 選択されたz値のレイヤーの点はシアン色にする
        colors[i] = 0.0;     // R
        colors[i + 1] = 1.0; // G
        colors[i + 2] = 1.0; // B
      } else {
        // それ以外のレイヤーの点は元の色に戻す
        colors[i] = originalColors[vertexIndex * 3];     // R
        colors[i + 1] = originalColors[vertexIndex * 3 + 1]; // G
        colors[i + 2] = originalColors[vertexIndex * 3 + 2]; // B
      }
    }

  // 色属性を更新
  points.geometry.attributes.color.needsUpdate = true;
};

  useEffect(() => {
    let container;
    let camera, scene, renderer;
    let controls;
    let animateId;
    window.updateScene = updateScene;

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

        const colors = new Float32Array(geometry.attributes.position.count * 3);
        for (let i = 0; i < geometry.attributes.position.count; i++) {
          colors[i * 3] = geometry.attributes.color.array[i * 3];
          colors[i * 3 + 1] = geometry.attributes.color.array[i * 3 + 1];
          colors[i * 3 + 2] = geometry.attributes.color.array[i * 3 + 2];
        }
        console.log(colors)
        

        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.userData.originalColors = colors.slice(); // 元の色情報を保存


        // 色属性があることを確認
        if (geometry.attributes.color) {
          let positions = geometry.attributes.position.array;
          let colors = geometry.attributes.color.array;
          // -79~79
          const zValue = -79/* ここに特定のZ軸の値を設定 */;
          
          for (let i = 0; i < positions.length; i += 3) {
            // positionsはx, y, zの順で格納されている
            if (positions[i + 2] === zValue) {
              // 色を赤色の半透明に設定（RGBAの形式で、値は0から1）シアン色
              colors[i] = 0.0;     // R
              colors[i + 1] = 1.0; // G
              colors[i + 2] = 1.0; // B
              // colors[i + 3] = 1.0; // A（不透明度を設定する場合）
            }
          }

          geometry.attributes.color.needsUpdate = true;
        }

        var material = new THREE.PointsMaterial({
          size: 0.02,
          vertexColors: true
        });

        var points = new THREE.Points(geometry, material);
          points.scale.multiplyScalar(0.005);
          scene.add(points);
          pointsRef.current = points;
      });

      var axesHelper = new THREE.AxesHelper(5);
      scene.add(axesHelper);

      window.addEventListener("resize", onWindowResize, false);
    }

    function onWindowResize() {
      const width = window.innerWidth * 0.5;
      const height = window.innerHeight * 0.9;

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
        <Router>
          <Routes>
            <Route path="/cam" element={<CamPage />} />
          </Routes>
        </Router>
      <div>
        <ImageList />
        <PatientBioDataList patients={patientsData}/>
      </div>
      {/* <div style={{ flexBasis: '50%' }}>helloooooooooooooooo<br/>Sg</div> */}
      <div ref={mountRef} />
    </div>
  );
}
