export async function translateGesture(text: string) {
  const res = await fetch("http://127.0.0.1:8000/translate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return res.json();
}