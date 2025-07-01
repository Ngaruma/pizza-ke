
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send, Bot } from 'lucide-react';
import { useAI } from '@/hooks/useAI';
import { useAuth } from '@/contexts/AuthContext';

export function AIChat() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{
    role: 'user' | 'ai';
    content: string;
    timestamp: Date;
  }>>([]);
  
  const { askAI, loading } = useAI();
  const { user } = useAuth();

  const handleSend = async () => {
    if (!message.trim() || !user) return;

    const userMessage = { role: 'user' as const, content: message, timestamp: new Date() };
    setConversation(prev => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await askAI(message, 'Pizza ordering platform');
      const aiMessage = { role: 'ai' as const, content: response, timestamp: new Date() };
      setConversation(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('AI Error:', error);
    }
  };

  if (!user) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Please sign in to use AI chat</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Pizza AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-64 overflow-y-auto border rounded-lg p-4 space-y-2">
          {conversation.length === 0 ? (
            <div className="text-center text-gray-500">
              Ask me anything about pizzas, orders, or our platform!
            </div>
          ) : (
            conversation.map((msg, idx) => (
              <div key={idx} className={`p-2 rounded-lg ${
                msg.role === 'user' 
                  ? 'bg-orange-100 ml-8 text-right' 
                  : 'bg-gray-100 mr-8'
              }`}>
                <div className="text-sm">{msg.content}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="bg-gray-100 mr-8 p-2 rounded-lg">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about pizzas, orders, or anything..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !message.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
