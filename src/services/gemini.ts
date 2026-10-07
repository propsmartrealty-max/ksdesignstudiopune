export async function executeTectonicAI(
  prompt: string,
  imageData?: string,
  systemInstruction?: string
) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: prompt })
    });
    const result = await response.json();
    return result.reply;
  } catch (error) {
    console.error("AI Error:", error);
    return "KS Design Studio AI is calibrating. Please try again later.";
  }
}

export async function getDesignAdviceWithGrounding(
  prompt: string,
  imageData?: string,
  userLocation?: { lat: number; lng: number }
) {
  const reply = await executeTectonicAI(prompt, imageData);
  return { text: reply, links: [] };
}
