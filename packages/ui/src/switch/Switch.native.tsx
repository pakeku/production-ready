import { Switch as TSwitch } from "tamagui";
import type { SwitchProps } from "./Switch";

export function Switch({ checked, onCheckedChange, disabled, defaultChecked }: SwitchProps) {
  return (
    <TSwitch checked={checked} onCheckedChange={onCheckedChange} disabled={disabled} defaultChecked={defaultChecked}>
      <TSwitch.Thumb />
    </TSwitch>
  );
}
