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
      <div className="App" style={{ display: 'flex', alignItems: 'flex-start' }}>
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
        <div>
          <img src="gpt.png" style={{ height: '50px'}} />
          <p>
            胸部X線画像における通常の肺は、透明で暗い領域として表示されるのが特徴です。しか
            し、 何らかの炎症や感染により肺組織に水分や痰が潜まると、その部位は白く濃い領域
            してX線画像上に現れます。これは、X線が水分や療により散乱・吸収されるためです。

            2枚目のgrad-CAMのヒートマップを確認すると、特定の領域に赤や英色の強い色が現れて
            います。これは、Alモデルが肺炎の診断を行う際に特に注目した領域を示しています。この
            濃い色の部位は、肺組織に何らかの変化や異常が存在する可能性を示唆しており、具体的
            には炎症や感染の兆候と考えられます。

            具体的には、胸部X線画像上のこのヒートマップに示される徹域は、肺の下葉や中葉に相当
            する部分に集中しているようです。 肺炎の場合、しばしば肺の下葉に症状が現れることが
            多いため、この結果は肺炎の典型的な所見と一致しています。

            維じて、この胞部X線画像とヒートマップに基づくと、肺の特定の領域に炎症や感染が起き
            ている可能性が高いと考えられます。そして、AIモデルはこの情報を元に、92.1%の確率で
            肺炎の診断を行いました。もちろん、 最終的な診断や治療方針については、 医師の詳細な
            検査と判断が必要です。
          </p>
        </div> 
      </div>
    );
  
};