"use client";

import { RxSpeakerLoud, RxSpeakerOff } from "react-icons/rx";
import { useSettingsStore } from "~/lib/globals/settings";

export default function Sound() {
  const { settings, toggleMuted } = useSettingsStore();

  return (
    <button className="p-4 text-3xl" onClick={toggleMuted}>
      {settings.muted ? <RxSpeakerOff /> : <RxSpeakerLoud />}
    </button>
  );
}
