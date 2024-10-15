import { createGlobalStyle } from 'styled-components';

import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    font-size: 16px;
    line-height: 1.6;
    font-family: "Noto Sans KR";    
  }
  a {
    text-decoration: none;
    color: #000;
  }
  li {
    list-style: none;
  }
  table {
    width: 100%;
  }
  input{
    box-sizing: border-box;
  }
 /* 팀 멤버 등장 시 애니메이션 */
@keyframes popIn {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-15deg);
  }
  50% {
    opacity: 1;
    transform: scale(1.1) rotate(5deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

/* 텍스트 반짝이는 애니메이션 */
@keyframes glow {
  0% {
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 255, 255, 0.4),
      0 0 30px rgba(255, 255, 255, 0.3);
  }
  100% {
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.8),
      0 0 40px rgba(255, 255, 255, 0.7);
  }
}

.scale-in {
  opacity: 0;
  animation: popIn 0.8s forwards;
}

.glow {
  animation: glow 2s infinite alternate;
}

.scale-in-delay-1 {
  animation-delay: 0.3s;
}

.scale-in-delay-2 {
  animation-delay: 0.6s;
}

.scale-in-delay-3 {
  animation-delay: 0.9s;
}

.scale-in-delay-4 {
  animation-delay: 1.2s;
}

.scale-in-delay-5 {
  animation-delay: 1.5s;
}

`;

export default GlobalStyle;
