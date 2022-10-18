import React from "react";

type ConfigProps = {
  title: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  style?: React.CSSProperties;
};

interface InputDefaultProps {
  config: ConfigProps;
}

export default function InputDefault({ config }: InputDefaultProps) {
  return (
    <div>
      <p>{config.title}</p>
      <input
        value={config.value}
        onChange={(e) => config.setValue(e.target.value)}
        placeholder={config.placeholder ? config.placeholder : ""}
        style={config.style ? config.style : {}}
      />
    </div>
  );
}
