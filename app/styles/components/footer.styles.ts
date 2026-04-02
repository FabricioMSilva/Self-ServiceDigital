import styled from "styled-components";

export const FooterContainer = styled.footer`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  z-index: 30;
  border-top: 1px solid rgba(245, 245, 245, 0.08);
  background:
    linear-gradient(135deg, #0a0a0a 0%, #161616 28%, #2c2c2c 52%, #1b1233 74%, #7a3fff 100%);
  background-size: 240% 240%;
  animation: footerGradientShift 18s ease-in-out infinite;
  backdrop-filter: blur(14px);
  box-shadow: 0 -8px 22px rgba(0, 0, 0, 0.16);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 18% 60%, rgba(245, 245, 245, 0.08), transparent 24%),
      radial-gradient(circle at 82% 40%, rgba(122, 63, 255, 0.2), transparent 28%);
    opacity: 0.9;
    pointer-events: none;
  }

  @keyframes footerGradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const FooterWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    padding: 0.7rem 0.85rem;
  }
`;

export const FooterText = styled.p`
  margin: 0;
  color: rgba(245, 245, 245, 0.82);
  font-size: 0.78rem;
  line-height: 1.35;
`;
