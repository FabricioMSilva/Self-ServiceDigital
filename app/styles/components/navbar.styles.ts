import Link from "next/link";
import styled from "styled-components";
import { theme } from "../theme";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 50;
  border-bottom: 1px solid rgba(245, 245, 245, 0.08);
  background:
    linear-gradient(135deg, #0a0a0a 0%, #161616 28%, #2c2c2c 52%, #1b1233 74%, #7a3fff 100%);
  background-size: 240% 240%;
  animation: navbarGradientShift 18s ease-in-out infinite;
  backdrop-filter: blur(14px);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.16);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 15% 50%, rgba(245, 245, 245, 0.12), transparent 24%),
      radial-gradient(circle at 85% 40%, rgba(122, 63, 255, 0.24), transparent 28%);
    opacity: 0.9;
    pointer-events: none;
  }

  @keyframes navbarGradientShift {
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

export const NavWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.55rem 1rem;
  gap: 0.75rem;

  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 0.55rem 0.85rem;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
  height: 72px;
  transition: opacity ${theme.transitions.fast};

  &:hover {
    opacity: 0.88;
  }

  img {
    height: 100%;
    width: auto;
  }
`;

export const BrandTitle = styled.h1`
  display: none;
  font-size: ${theme.font.size["2xl"]};
  font-weight: ${theme.font.weight.bold};
  color: ${theme.colors.primaryLight};
  margin: 0;

  @media (min-width: ${theme.breakpoints.md}) {
    display: block;
  }
`;

export const NavMenu = styled.nav`
  display: none;
  align-items: center;
  justify-content: flex-end;
  gap: 0.15rem;
  font-size: ${theme.font.size.sm};
  flex: 1;

  @media (min-width: ${theme.breakpoints.md}) {
    display: flex;
  }
`;

export const NavLink = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  gap: 0.18rem;
  min-width: 62px;
  min-height: 50px;
  padding: 0.4rem 0.5rem;
  border: 1px solid
    ${(props) => (props.$isActive ? `${theme.colors.primary}44` : "transparent")};
  border-radius: ${theme.radius.lg};
  color: ${(props) =>
    props.$isActive ? "#f5f5f5" : "rgba(245, 245, 245, 0.82)"};
  background: ${(props) =>
    props.$isActive
      ? "linear-gradient(135deg, rgba(122, 63, 255, 0.28), rgba(245, 245, 245, 0.1))"
      : "transparent"};
  font-weight: ${theme.font.weight.medium};
  transition:
    transform ${theme.transitions.fast},
    color ${theme.transitions.fast},
    border-color ${theme.transitions.fast},
    background ${theme.transitions.fast};

  span:first-child {
    font-size: 21px;
    line-height: 1;
  }

  span:last-child {
    font-size: 0.74rem;
    line-height: 1.1;
    text-align: center;
  }

  &:hover {
    transform: translateY(-1px);
    color: #f5f5f5;
    border-color: rgba(245, 245, 245, 0.16);
    background: linear-gradient(135deg, rgba(122, 63, 255, 0.2), rgba(245, 245, 245, 0.08));
  }
`;

export const ActionsContainer = styled.div`
  display: none;
  align-items: center;
  gap: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    display: flex;
  }
`;

export const ProfileButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.textSecondary};
  font-weight: ${theme.font.weight.medium};
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primaryLight};
  }
`;

export const LogoutButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.error};
  font-weight: ${theme.font.weight.medium};
  border-radius: ${theme.radius.md};
  font-size: ${theme.font.size.sm};
  transition: background-color ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.error}33;
  }
`;

export const AuthLink = styled.a`
  font-weight: ${theme.font.weight.medium};
`;

export const LoginLink = styled(AuthLink)`
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primaryLight};
  }
`;

export const RegisterButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.font.weight.medium};
  transition: background-color ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }
`;

export const Divider = styled.div`
  height: 24px;
  width: 1px;
  background-color: ${theme.colors.border};
  margin: 0 ${theme.spacing.sm};
`;

export const QuoteButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: ${theme.colors.accent};
  color: #000;
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.font.weight.bold};
  transition: background-color ${theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    background-color: ${theme.colors.accentHover};
  }
`;

export const MobileMenuButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(245, 245, 245, 0.14);
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.sm};
  color: rgba(245, 245, 245, 0.86);
  transition:
    border-color ${theme.transitions.fast},
    color ${theme.transitions.fast};

  &:hover {
    border-color: rgba(245, 245, 245, 0.24);
    color: #f5f5f5;
  }

  span {
    display: block;
    height: 2px;
    width: 20px;
    background-color: currentColor;
  }

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export const MobileMenuContainer = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "block" : "none")};
  background:
    linear-gradient(180deg, rgba(10, 10, 10, 0.96), rgba(44, 44, 44, 0.94));
  backdrop-filter: blur(10px);
  padding: 0.75rem;
  border-top: 1px solid rgba(245, 245, 245, 0.08);

  @media (min-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

export const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const MobileNavLink = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  border-radius: ${theme.radius.lg};
  padding: 0.75rem 0.65rem;
  font-size: ${theme.font.size.base};
  color: ${(props) =>
    props.$isActive ? "#f5f5f5" : "rgba(245, 245, 245, 0.82)"};
  border: 1px solid
    ${(props) => (props.$isActive ? `${theme.colors.primary}38` : "transparent")};
  background: ${(props) =>
    props.$isActive ? "rgba(122, 63, 255, 0.18)" : "transparent"};
  transition:
    background-color ${theme.transitions.fast},
    color ${theme.transitions.fast},
    border-color ${theme.transitions.fast};
  font-weight: ${theme.font.weight.medium};

  span:first-child {
    font-size: 20px;
    line-height: 1;
  }

  span:last-child {
    text-align: center;
    line-height: 1.1;
    font-size: 0.76rem;
  }

  &:hover {
    background-color: rgba(245, 245, 245, 0.08);
    color: #f5f5f5;
  }
`;

export const MobileSection = styled.div`
  border-top: 1px solid ${theme.colors.border};
  padding-top: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const MobileButton = styled.button`
  padding: ${theme.spacing.md};
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.font.weight.bold};
  transition: all ${theme.transitions.fast};
`;

export const MobileQuoteButton = styled(MobileButton)`
  width: 100%;
  background-color: ${theme.colors.accent};
  color: #000;

  &:hover {
    background-color: ${theme.colors.accentHover};
  }
`;
