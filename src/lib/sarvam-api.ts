const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY;
const SARVAM_API_URL = 'https://api.sarvam.ai/v1/chat/completions';

/**
 * Represents a message in the conversation with Sarvam AI
 */
export interface SarvamMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  name?: string; // Optional name for the message sender
}

/**
 * Response format from Sarvam AI API
 */
export interface SarvamResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Options for the getDebateResponse method
 */
export interface DebateResponseOptions {
  context?: string;
  conversationHistory?: SarvamMessage[];
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  presencePenalty?: number;
  frequencyPenalty?: number;
}

/**
 * SarvamAPI provides methods to interact with the Sarvam AI API
 */
export class SarvamAPI {
  private static instance: SarvamAPI;
  private readonly maxRetries = 3;
  private readonly baseDelay = 1000; // 1 second
  
  private constructor() {}
  
  /**
   * Get the singleton instance of SarvamAPI
   */
  public static getInstance(): SarvamAPI {
    if (!SarvamAPI.instance) {
      SarvamAPI.instance = new SarvamAPI();
    }
    return SarvamAPI.instance;
  }

  /**
   * Send a message to Sarvam AI and get a response
   * @param messages Array of message objects
   * @param options Additional options for the API call
   * @returns Promise that resolves to the AI's response text
   */
  async sendMessage(messages: SarvamMessage[], options: {
    maxTokens?: number;
    temperature?: number;
    topP?: number;
    presencePenalty?: number;
    frequencyPenalty?: number;
  } = {}): Promise<string> {
    if (!SARVAM_API_KEY) {
      throw new Error('Sarvam API key not found. Please check your environment variables.');
    }

    // Default options
    const {
      maxTokens = 500,
      temperature = 0.7,
      topP = 1.0,
      presencePenalty = 0,
      frequencyPenalty = 0,
    } = options;

    let lastError: Error | null = null;
    
    // Exponential backoff retry logic
    for (let attempt = 0; attempt < this.maxRetries; attempt++) {
      try {
        const response = await fetch(SARVAM_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SARVAM_API_KEY}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            model: 'sarvam-m',
            messages: messages,
            max_tokens: maxTokens,
            temperature: temperature,
            top_p: topP,
            presence_penalty: presencePenalty,
            frequency_penalty: frequencyPenalty,
            stream: false,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            `Sarvam API error: ${response.status} ${response.statusText}\n` +
            `Message: ${errorData.error?.message || 'Unknown error'}`
          );
        }

        const data: SarvamResponse = await response.json();
        
        if (!data.choices || data.choices.length === 0) {
          throw new Error('No response from Sarvam AI');
        }

        return data.choices[0]?.message?.content || 'No response content';
        
      } catch (error) {
        lastError = error as Error;
        console.error(`Attempt ${attempt + 1} failed:`, error);
        
        // If this was the last attempt, rethrow the error
        if (attempt === this.maxRetries - 1) break;
        
        // Wait before retrying (exponential backoff)
        const delay = this.baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // If we get here, all retries failed
    throw lastError || new Error('Failed to get response from Sarvam AI');
  }

  /**
   * Get a debate response with proper message alternation
   * @param userMessage The user's message
   * @param context Optional context for the conversation
   * @param conversationHistory Previous conversation history (must alternate between user and assistant)
   * @returns Promise that resolves to the AI's response
   */
  async getDebateResponse(conversationHistory: SarvamMessage[], context?: string): Promise<string> {
    const systemPrompt = `You are ArgueAI, an expert debate assistant for students. Only respond to questions about debating formats (BP, AP, MUN), argumentation, rebuttal techniques, logical fallacies, time management, judging criteria, and speaking tips. Politely refuse unrelated topics by saying: "I'm your debate mentor! Try asking me about rebuttals, speaker roles, or delivery tips."

${context ? `Current learning context: ${context}` : ''}

Keep responses concise but informative, typically 2-4 sentences unless a longer explanation is needed.`;

    // Start with system message
    const messages: SarvamMessage[] = [{
      role: 'system',
      content: systemPrompt
    }];

    // Add conversation history if it follows the alternation rule
    let lastRole: 'user' | 'assistant' | 'system' = 'system';
    const validHistory: SarvamMessage[] = [];
    
    for (const message of conversationHistory) {
      // Skip messages that don't alternate roles
      if (message.role === lastRole) continue;
      
      // Ensure we only have user and assistant messages in history
      if (message.role === 'user' || message.role === 'assistant') {
        validHistory.push(message);
        lastRole = message.role;
      }
    }

    // Add valid conversation history
    messages.push(...validHistory);

    // Ensure the last message is from the user
    if (messages.length > 1 && messages[messages.length - 1].role === 'assistant') {
      // If the last message is from assistant, remove it to maintain alternation
      messages.pop();
    }

    // The conversationHistory now includes the latest user message, so we don't add it here.

    return await this.sendMessage(messages);
  }
}

export const sarvamAPI = SarvamAPI.getInstance();
