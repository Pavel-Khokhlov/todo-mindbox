import React, { FormEvent, useState } from 'react';
import { styled } from '@linaria/react';
import Icon from '../../assets/icons/chevron.svg';
import SVG from 'react-inlinesvg';

export interface SVGProps {
  color?: string;
  src: string;
}

const StyledField = styled.label`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  height: min(80px, 12.5vw);
  border: none;
  padding-left: min(60px, 12.5vw);
  box-sizing: border-box;
  font-size: min(25px, 5vw);
  font-style: italic;
  outline: none;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const StyledIcon = styled(SVG)<SVGProps>`
  position: absolute;
  top: 50%;
  left: 0;
  padding: 0 10px;
  transform: translate(0, -50%);
  width: min(40px, 6.25vw);
  height: min(40px, 6.25vw);
`;

interface FieldInputProps {
  value?: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const FieldInput = ({ value, onChange, placeholder }: FieldInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(!isFocused);
  };
  return (
    <StyledField>
      <StyledInput
        onChange={onChange}
        value={value}
        placeholder={!isFocused ? placeholder : ''}
        onFocus={handleFocus}
        onBlur={handleFocus}
      />
      <StyledIcon src={Icon} color={isFocused ? 'skyblue' : 'rgba(0, 0, 0, 0.2)'} />
    </StyledField>
  );
};

export default FieldInput;
