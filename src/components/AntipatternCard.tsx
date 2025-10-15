import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { Antipattern } from '@/data/antipatterns';

interface AntipatternCardProps {
  antipattern: Antipattern;
  answers: Record<string, boolean | null>;
  comments: Record<string, string>;
  onAnswerChange: (questionId: string, answer: boolean | null) => void;
  onCommentChange: (questionId: string, comment: string) => void;
}

export const AntipatternCard = ({
  antipattern,
  answers,
  comments,
  onAnswerChange,
  onCommentChange
}: AntipatternCardProps) => {
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});

  const toggleComment = (questionId: string) => {
    setShowComments(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const isAntipatternDetected = () => {
    const userAnswers = antipattern.questions.map(q => answers[q.id]);
    if (userAnswers.some(answer => answer === null || answer === undefined)) {
      return null; // Cannot determine
    }
    return JSON.stringify(userAnswers) === JSON.stringify(antipattern.expectedAnswers);
  };

  const getResultBadge = () => {
    const detected = isAntipatternDetected();
    if (detected === null) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          Incomplete
        </Badge>
      );
    }
    if (detected) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="w-3 h-3" />
          Antipattern detected
        </Badge>
      );
    }
    return (
      <Badge variant="default" className="flex items-center gap-1 bg-success hover:bg-success/90">
        <CheckCircle className="w-3 h-3" />
        Not present
      </Badge>
    );
  };

  return (
    <Card className="w-full transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-lg font-bold text-foreground">
            {antipattern.name}
          </CardTitle>
          {getResultBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {antipattern.questions.map((question, index) => (
          <div key={question.id} className="space-y-3 p-4 rounded-lg bg-muted/30">
            <p className="text-sm font-medium text-foreground leading-relaxed">
              {index + 1}. {question.text}
            </p>
            
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <Button
                  variant={answers[question.id] === true ? "default" : "outline"}
                  size="sm"
                  onClick={() => onAnswerChange(question.id, true)}
                  className="min-w-[60px]"
                >
                  Yes
                </Button>
                <Button
                  variant={answers[question.id] === false ? "default" : "outline"}
                  size="sm"
                  onClick={() => onAnswerChange(question.id, false)}
                  className="min-w-[60px]"
                >
                  No
                </Button>
                <Button
                  variant={answers[question.id] === null ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => onAnswerChange(question.id, null)}
                  className="min-w-[80px]"
                >
                  Skip
                </Button>
              </div>
              
                <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleComment(question.id)}
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                <MessageSquare className="w-4 h-4" />
                Comment
              </Button>
            </div>

            {showComments[question.id] && (
              <div className="mt-3">
                <Textarea
                  placeholder="Add an optional comment..."
                  value={comments[question.id] || ''}
                  onChange={(e) => onCommentChange(question.id, e.target.value)}
                  className="min-h-[80px] resize-none"
                />
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};