import { UiProvider, ScreenCenter, Login } from "@repo/ui";

export default function App() {
  return (
    <UiProvider>
      <ScreenCenter>
        <Login />
      </ScreenCenter>
    </UiProvider>
  );
}
