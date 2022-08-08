import React, { FormEvent, useState } from 'react';
import { styled } from '@linaria/react';
import Icon from '../../assets/icons/chevron.svg';
import SVG from 'react-inlinesvg';

export interface SVGProps {
  color?: string;
  size?: string | number| undefined;
}

const SField = styled.label`
  position: relative;
`;

const SInput = styled.input`
  width: 100%;
  height: 80px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding-left: 60px;
  box-sizing: border-box;
  font-size: 25px;
  font-style: italic;
  outline: none;
  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const SIcon = styled(SVG)<SVGProps>`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translate(0, -50%);
  wisth: 40px;
  height: 40px;
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
    <SField>
      <SInput
        onChange={onChange}
        value={value}
        placeholder={!isFocused ? placeholder : ''}
        onFocus={handleFocus}
        onBlur={handleFocus}
      />
      <SIcon src={Icon} color={isFocused ? 'skyblue' : 'rgba(0, 0, 0, 0.2)'} />
    </SField>
  );
};

export default FieldInput;
