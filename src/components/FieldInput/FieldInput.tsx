import React, { FormEvent, useState } from 'react';
import { styled } from '@linaria/react';
import IconChevron from '../../assets/icons/chevron.svg';
import IconAdd from '../../assets/icons/add.svg';
import SVG from 'react-inlinesvg';

export interface SVGProps {
  color?: string;
  src: string;
}

const StyledField = styled.label`
  position: relative;
  display: flex;
  align-items: center;
`;

const StyledInput = styled.input`
  width: 95%;
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
`;

const StyledIconChevron = styled(SVG)<SVGProps>`
  position: absolute;
  top: 50%;
  left: 0;
  padding: 0 10px;
  transform: translate(0, -50%);
  width: min(40px, 6.25vw);
  height: min(40px, 6.25vw);
`;
const StyledIconAdd = styled(SVG)<SVGProps>`
  padding: 0 10px;
  width: min(40px, 6.25vw);
  height: min(40px, 6.25vw);
`;

interface FieldInputProps {
  value?: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  onAddClick: (e: FormEvent<Element>) => void;
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
`;

const FieldInput = ({ value, onChange, onAddClick, placeholder, disabled }: FieldInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };
  return (
    <StyledField>
      <StyledIconChevron src={IconChevron} color={isFocused ? 'rgba(0, 0, 200, 0.5)' : 'rgba(0, 0, 0, 0.2)'} />
      <StyledInput
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleFocus}
      />
      <StyledButton onClick={onAddClick} disabled={disabled}>
        <StyledIconAdd src={IconAdd} color={disabled ? 'lightgrey' : 'rgba(0, 0, 200, 0.5)'}  />
      </StyledButton>
    </StyledField>
  );
};

export default FieldInput;
