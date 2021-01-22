import styled, { keyframes } from 'styled-components/macro'

const loadingAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`

export const FakeInfo = styled.span`
  animation-name: ${loadingAnimation};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  background: linear-gradient(270deg, #ddd, #efefef);
  background-size: 200% 200%;
  color: transparent;
  height: 16px;
  opacity: 0.7;
  border-radius: 10px;
`
