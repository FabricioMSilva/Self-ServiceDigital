import styled from "styled-components";
import { theme } from "../theme";

export const CartButtonContainer = styled.a`
  width: 100%;

  @media (min-width: ${theme.breakpoints.sm}) {
    width: auto;
  }
`;

export const CartButton = styled.button`
  width: 100%;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background-color: #2563eb;
  color: ${theme.colors.text};
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.font.weight.medium};
  transition: background-color ${theme.transitions.fast};

  &:hover {
    background-color: #1d4ed8;
  }

  svg {
    width: 20px;
    height: 20px;
  }

  span {
    display: none;

    @media (min-width: ${theme.breakpoints.sm}) {
      display: inline;
    }
  }
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${theme.colors.error};
  color: ${theme.colors.text};
  font-size: ${theme.font.size.xs};
  font-weight: ${theme.font.weight.bold};
  border-radius: 9999px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
