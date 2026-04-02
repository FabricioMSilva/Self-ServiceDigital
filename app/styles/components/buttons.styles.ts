import styled from "styled-components";
import { theme } from "../theme";

export const ButtonBase = styled.button`
  font-weight: ${theme.font.weight.semibold};
  border-radius: ${theme.radius.lg};
  transition: all ${theme.transitions.fast};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  font-size: ${theme.font.size.base};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(ButtonBase)`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  padding: ${theme.spacing.sm} ${theme.spacing.md};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.primaryDark};
  }
`;

export const SecondaryButton = styled(ButtonBase)`
  background-color: ${theme.colors.surface};
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.sm} ${theme.spacing.md};

  &:hover:not(:disabled) {
    border-color: ${theme.colors.primary};
    background-color: ${theme.colors.surface}80;
  }
`;

export const AccentButton = styled(ButtonBase)`
  background-color: ${theme.colors.accent};
  color: #000;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-weight: ${theme.font.weight.bold};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.accentHover};
  }
`;

export const DangerButton = styled(ButtonBase)`
  background-color: ${theme.colors.error}20;
  color: #fca5a5;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: 1px solid ${theme.colors.error}50;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.error}30;
  }
`;

export const SuccessButton = styled(ButtonBase)`
  background-color: ${theme.colors.success};
  color: ${theme.colors.text};
  padding: ${theme.spacing.sm} ${theme.spacing.md};

  &:hover:not(:disabled) {
    background-color: ${theme.colors.success}80;
  }
`;

export const FullWidthButton = styled(ButtonBase)`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
`;

export const LargeButton = styled(PrimaryButton)`
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
  font-size: ${theme.font.size.lg};
`;

export const SmallButton = styled(PrimaryButton)`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  font-size: ${theme.font.size.sm};
`;
