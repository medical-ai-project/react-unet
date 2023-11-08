import React, { useState } from 'react';

// スタイルを定義します。必要に応じてCSSファイルに移動しても構いません。
const styles = {
  container: {
    width: '50vw', // コンテナの幅をビューポートの幅の50%にします。
    margin: '0 auto', // コンテナを画面の中央に配置します。
    border: '1px solid #ccc', // 見た目を整えるためのボーダーです。
    padding: '20px', // 内容とボーダーの間にスペースを確保します。
    boxSizing: 'border-box', // パディングとボーダーを幅に含めます。
  },
  listContainer: {
    maxHeight: '20vh', // リストの最大高さをビューポートの高さの50%にします。
    overflowY: 'scroll', // 縦スクロールを可能にします。
    marginBottom: '20px', // 画像とリストの間にスペースを追加します。
  },
  imageContainer: {
    display: 'flex', // Flexbox コンテナとして設定
    justifyContent: 'space-around', // 画像間に均等なスペースを設定
    flexDirection: 'row', // 子要素を行方向に配置
  },
  imageAndCaption: {
    display: 'flex', // Flexbox コンテナとして設定
    flexDirection: 'column', // 子要素を列方向に配置
    alignItems: 'center', // 中央揃え
    maxWidth: '50%', // コンテナの幅の50%
  },
  caption: {
    marginBottom: '10px', // キャプションと画像の間の余白
  },
  image: {
    maxWidth: '90%', // 画像の最大幅をコンテナの幅の50%に設定
    height: 'auto', // 画像の高さを自動調整
    display: 'block', // ブロックレベル要素として画像を表示
    marginBottom: '10px', // 次の画像との間にスペースを追加
  },
  button: {
    display: 'block', // ボタンをブロック要素として表示します。
    width: '100%', // ボタンの幅をリストの幅に合わせます。
    marginBottom: '5px', // ボタン同士の間にスペースを追加します。
    padding: '10px', // ボタン内のスペースを確保します。
    boxSizing: 'border-box', // パディングを幅に含めます。
  }
};

export const ImageList = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedImage, setSelectedImage] = useState({
    image: 'TCGA_HT_7881_19981015_1.png',
    mask: 'TCGA_HT_7881_19981015_1_mask.png'
  });
  
  const images = Array.from({ length: 80 }, (_, index) => ({
    image: `TCGA_HT_7881_19981015_${index + 1}.png`,
    mask: `TCGA_HT_7881_19981015_${index + 1}_mask.png`
  }));

  const handleClick = (imageObj, index) => {
    setSelectedImage(imageObj);
      // 例: z 値が -79 から 79 までの範囲である場合（偶数のインデックスのみを考慮）
    const zValue = (index * 2) - 79;
    window.updateScene(zValue);

    
  };

  const handleSliderChange = (event) => {
    const newIndex = parseInt(event.target.value, 10);
    setSliderValue(newIndex);
    setSelectedImage(images[newIndex]);
    const zValue = (newIndex * 2) - 79; // zValueの計算を行う
    window.updateScene(zValue); // updateScene関数を呼び出してzValueを渡す
  };

  return (
    <div style={styles.container}>
      <div style={styles.listContainer}>
        {images.map((imageObj, index) => (
          <button 
            key={index} 
            onClick={() => handleClick(imageObj, index)} 
            style={styles.button}
          >
            {imageObj.image}
          </button>
        ))}
      </div>
      <div style={styles.imageContainer}>
        <div style={styles.imageAndCaption}>
          <div style={styles.caption}>original</div>
          <img 
            src={`images/TCGA_HT_7881_19981015_png/${selectedImage.image}`} 
            alt={`${selectedImage.image}`} 
            style={styles.image}
          />
        </div>
        <div style={styles.imageAndCaption}>
          <div style={styles.caption}>mask</div>
          <img 
            src={`images/TCGA_HT_7881_19981015_png/${selectedImage.mask}`} 
            alt={`${selectedImage.mask}`} 
            style={styles.image}
          />
        </div>
      </div>
      <input
        type="range"
        min="0"
        max={images.length - 1} // 最大値は画像の数-1
        value={sliderValue}
        onChange={handleSliderChange}
        style={{ width: '100%' }} // スライダーのスタイル設定
      />
    </div>
  );
};