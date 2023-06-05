import React, { FormEvent, LegacyRef, useState } from 'react';
import { styled } from '@linaria/react';
import IconChevron from '../../assets/icons/chevron.svg';
import IconAdd from '../../assets/icons/add.svg';
import IconTask from '../../assets/icons/task.svg';
import SVG from 'react-inlinesvg';

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
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
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
`

const StyledIconChevron = styled(StyledIcon)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
`;

interface FieldInputProps {
  value?: string;
  place: 'create' | 'modal';
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  onAddClick?: (e: FormEvent<Element>) => void;
  placeholder: string;
  disabled?: boolean;
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
  &:active, &:focus {
    outline: none;
  }
`;

const FieldInput = ({value, place, onChange, onAddClick, placeholder, disabled }: FieldInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const currentSrc = place === "create" ? IconChevron : IconTask;
  const fieldClass = place;
  const inputClass = isFocused && place === "modal" ? `focus ${place}` : place;

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };
  return (
    <StyledField className={fieldClass}>
      <StyledIconChevron src={currentSrc} color={isFocused ? 'rgba(0, 0, 200, 0.5)' : 'rgba(0, 0, 0, 0.2)'} />
      <StyledInput
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleFocus}
        className={inputClass}
        autoFocus={true}
        spellcheck={false}
      />
      {place === "create" && <StyledButton onClick={onAddClick} disabled={disabled}>
        <StyledIcon src={IconAdd} color={disabled ? 'lightgrey' : 'rgba(0, 0, 200, 0.5)'}  />
      </StyledButton>}
    </StyledField>
  );
};

export default FieldInput;
