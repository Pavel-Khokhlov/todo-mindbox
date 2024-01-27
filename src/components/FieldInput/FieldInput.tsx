import React, { FormEvent, useState } from "react";
import { styled } from "@linaria/react";
import IconChevron from "../../assets/icons/chevron.svg";
import IconAdd from "../../assets/icons/add.svg";
import IconTask from "../../assets/icons/task.svg";
import SVG from "react-inlinesvg";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";

export interface SVGProps {
  color?: string;
  src: string;
}

const StyledField = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  &.modal {
    margin-bottom: 40px;
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  height: min(80px, 12.5vw);
  border: none;
  padding-left: min(60px, 12.5vw);
  box-sizing: border-box;
  font-size: min(25px, 5vw);
  font-style: italic;
  outline: none;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: transparent;
  &.dark {
    &::placeholder {
      color: rgba(255, 255, 255, 0.4);
    }
  }
  &.light {
    &::placeholder {
      color: rgba(0, 0, 0, 0.2);
    }
  }
  &.modal {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    height: min(70px, 10vw);
    &.focus {
      border-bottom: 1px solid rgba(0, 0, 200, 0.5);
    }
  }
`;

const StyledIcon = styled(SVG)<SVGProps>`
  padding: 0 10px;
  width: min(40px, 6.25vw);
  height: min(40px, 6.25vw);
`;

const StyledIconChevron = styled(StyledIcon)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
`;

interface FieldInputProps {
  place: "create" | "modal";
  placeholder: string;
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  onSubmit?: (e: FormEvent<HTMLButtonElement>) => void;
  onBlur?: () => void;
  isFocused?: boolean;
}

export const StyledButton = styled.button`
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:active,
  &:focus {
    outline: none;
  }
`;

const FieldInput = observer(
  ({ place, placeholder, value, onChange, onSubmit, onBlur, isFocused }: FieldInputProps) => {
    const { globalUIStore } = useStore();

    const currentSrc = place === "create" ? IconChevron : IconTask;
    const fieldClass = place;
    const inputClass = `${globalUIStore.theme.name} ${
      isFocused && place === "modal" ? `focus ${place}` : place
    }`;

    return (
      <StyledField
        className={fieldClass}
        style={{ color: globalUIStore.theme.mainBodyColor }}
      >
        <StyledIconChevron
          src={currentSrc}
          color={
            !isFocused
              ? globalUIStore.theme.disabledColor
              : globalUIStore.theme.infoColor
          }
        />
        <StyledInput
          style={{ color: globalUIStore.theme.textInputColor }}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          onFocus={onBlur}
          onBlur={onBlur}
          className={inputClass}
          autoFocus={true}
          spellCheck={false}
        />
        {place === "create" && (
          <StyledButton onClick={onSubmit} disabled={!value}>
            <StyledIcon
              src={IconAdd}
              color={
                !value
                  ? globalUIStore.theme.disabledColor
                  : globalUIStore.theme.infoColor
              }
            />
          </StyledButton>
        )}
      </StyledField>
    );
  }
);

export default FieldInput;
