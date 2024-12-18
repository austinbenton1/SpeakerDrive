interface ChatbotResponse {
  response: string;
  status: number;
}

export async function sendChatMessage(message: string): Promise<ChatbotResponse> {
  try {
    const url = 'https://n8n.speakerdrive.com/webhook-test/ai-data';
    const params = new URLSearchParams({ message });

    const response = await fetch(`${url}?${params}`, {
      method: 'POST',
      headers: {
        'Username': 'webhooktest123',
        'Password': 'qwe123',
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to get chatbot response');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}