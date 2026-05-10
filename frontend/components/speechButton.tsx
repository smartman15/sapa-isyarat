"use client";

type Props = {
  onResult: (text: string) => void;
};

export default function SpeechButton({ onResult }: Props) {
  const startListening = () => {
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.start();

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      onResult(text);
    };
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div>
      <button onClick={startListening}>🎤 Speak</button>
      <button onClick={() => speak("Halo")}>🔊 Play</button>
    </div>
  );
}