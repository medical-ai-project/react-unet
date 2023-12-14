// 患者情報のダミーデータ

import React, { useState } from 'react';

// 患者情報を表示するコンポーネント
export const CamPage = () => {
    const [imageIndex, setImageIndex] = useState(0);

    const images = [
      '/cam_images/grad_cam0.png',
      '/cam_images/grad_cam1.png',
      '/cam_images/grad_cam2.png',
      '/cam_images/grad_cam3.png',
      '/cam_images/grad_cam4.png',
      '/cam_images/grad_cam5.png',
      '/cam_images/grad_cam6.png',
      '/cam_images/grad_cam7.png',
      '/cam_images/grad_cam8.png',
      '/cam_images/grad_cam9.png',
      '/cam_images/grad_cam10.png'
    ];

  
    const handleChange = (e) => {
      setImageIndex(e.target.value);
    }
  
  
    return (
      <div className="App">
        <div style={{display: "inline-block"}}>
          <img src={images[imageIndex]} alt="表示画像" style={{ width: 'auto', height: '300px' }} /><br/>
          <input 
            type="range" 
            min="0" 
            max={images.length - 1}  // maxをimagesの長さ-1に設定
            value={imageIndex} 
            onChange={handleChange} 
          />
        </div>
  
      </div>
    );
  
};