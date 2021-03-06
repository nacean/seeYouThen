import Image from 'next/image';
import React from 'react';
import styles from './KaKaoShareButton.module.scss';

interface KakaoShareButtonType {
  roomName: string;
  roomUrl: string;
}

function KakaoShareButton({ roomName, roomUrl }: KakaoShareButtonType) {
  const kakaoShareOnClick = () => {
    window.Kakao.Link.sendDefault({
      objectType: 'text',
      text: `방이름 : ${roomName}\nSeeYouThen : 일정 공유 사이트`,
      link: {
        mobileWebUrl: roomUrl,
        webUrl: roomUrl,
      },
    });
  };

  return (
    <button className={styles.kakaoShareBtn} onClick={kakaoShareOnClick}>
      <Image
        src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오톡 공유 보내기 버튼"
        width={40}
        height={40}
      />
    </button>
  );
}

export default KakaoShareButton;
