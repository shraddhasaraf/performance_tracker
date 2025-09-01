// AI API utility for reframing feedback text

// const AI_API_TEST_URL = 'https://ssaraf8.app.n8n.cloud/webhook-test/ca0cc0bf-209d-489c-9324-46b1f62a523d';
const AI_API_URL = 'https://ssaraf8.app.n8n.cloud/webhook/ca0cc0bf-209d-489c-9324-46b1f62a523d';

export const reframeFeedbackWithAI = async (feedbackText) => {
  try {
    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feedback_text: feedbackText
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      reframedText: data.feedback_text || data.text || '',
      originalText: feedbackText
    };
  } catch (error) {
    console.error('AI API Error:', error);
    return {
      success: false,
      error: error.message,
      originalText: feedbackText
    };
  }
};
