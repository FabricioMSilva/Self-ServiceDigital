import styled from "styled-components";
import { theme } from "../theme";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

export const FormLabel = styled.label`
  display: block;
  font-size: ${theme.font.size.sm};
  font-weight: ${theme.font.weight.semibold};
  color: ${theme.colors.primaryLight};
  margin-bottom: ${theme.spacing.sm};
`;

export const FormInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: ${theme.font.size.base};
  transition: border-color ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.textDimmed};
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: ${theme.spacing.md};
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: ${theme.font.size.base};
  font-family: inherit;
  resize: vertical;
  transition: border-color ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.textDimmed};
  }
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: ${theme.spacing.md};
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.border};
  background-color: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: ${theme.font.size.base};
  font-family: inherit;
  transition: border-color ${theme.transitions.fast};

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  option {
    background-color: ${theme.colors.surface};
    color: ${theme.colors.text};
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }

  &.full {
    grid-template-columns: 1fr;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text};
  border-radius: ${theme.radius.lg};
  font-weight: ${theme.font.weight.bold};
  font-size: ${theme.font.size.base};
  transition: background-color ${theme.transitions.fast};
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: ${theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${theme.colors.textDimmed};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const ErrorMessage = styled.div`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.error}18;
  border: 1px solid ${theme.colors.error}50;
  border-radius: ${theme.radius.lg};
  color: #fca5a5;
  font-size: ${theme.font.size.sm};
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: flex-start;
`;

export const SuccessMessage = styled.div`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.success}18;
  border: 1px solid ${theme.colors.success}50;
  border-radius: ${theme.radius.lg};
  color: #86efac;
  font-size: ${theme.font.size.sm};
  display: flex;
  gap: ${theme.spacing.sm};
  align-items: flex-start;
`;
