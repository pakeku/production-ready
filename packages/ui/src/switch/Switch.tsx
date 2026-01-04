import React from "react";
import { Switch as TSwitch } from "tamagui";

export type SwitchProps = {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  defaultChecked?: boolean;
};

export function Switch({ checked, onCheckedChange, disabled, defaultChecked }: SwitchProps) {
  return (
    <TSwitch checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} defaultChecked={defaultChecked}>
      <TSwitch.Thumb />
    </TSwitch>
  );
}