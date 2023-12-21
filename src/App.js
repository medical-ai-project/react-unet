import React, { useEffect, useRef } from 'react';

import { ImageList } from './components/ImageList';
import { PatientBioDataList } from './components/PatientBioDataList';
import { CamPage } from './components/CamPage';
import { Brain_tumor } from './components/Brain_tumor'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
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
        <Route path="/" element={
          <>
            <div>
              <ImageList/>
              <PatientBioDataList patients={patientsData}/>
            </div>
            <div>
              <Brain_tumor />
            </div>
          </>
        }/>
      </Routes>
    </Router>
  </div>
  );
}
