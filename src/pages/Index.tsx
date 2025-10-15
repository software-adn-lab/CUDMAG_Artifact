import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResultsTab } from '@/components/ResultsTab';
import { scrumTabs } from '@/data/antipatterns';
import { Target, CheckCircle, AlertTriangle, MessageSquare, Users2 } from 'lucide-react';

const Index = () => {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('daily');
  const [showComments, setShowComments] = useState<Record<string, boolean>>({});

  const handleAnswerChange = (questionId: string, answer: boolean | null) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleCommentChange = (questionId: string, comment: string) => {
    setComments(prev => ({ ...prev, [questionId]: comment }));
  };

  const toggleComment = (questionId: string) => {
    setShowComments(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const progress = useMemo(() => {
    const totalQuestions = scrumTabs.reduce((sum, tab) => 
      sum + tab.antipatterns.reduce((antiSum, anti) => antiSum + anti.questions.length, 0), 0
    );
    const answeredQuestions = Object.values(answers).filter(answer => answer !== null && answer !== undefined).length;
    return Math.round((answeredQuestions / totalQuestions) * 100);
  }, [answers]);

  const hasAnswers = useMemo(() => {
    return Object.values(answers).some(answer => answer !== null && answer !== undefined);
  }, [answers]);

  const detectedCount = useMemo(() => {
    let count = 0;
    scrumTabs.forEach(tab => {
      tab.antipatterns.forEach(antipattern => {
        const userAnswers = antipattern.questions.map(q => answers[q.id]);
        const hasAllAnswers = userAnswers.every(answer => answer !== null && answer !== undefined);
        
        if (hasAllAnswers && JSON.stringify(userAnswers) === JSON.stringify(antipattern.expectedAnswers)) {
          count++;
        }
      });
    });
    return count;
  }, [answers]);

  const getTabStats = (tabId: string) => {
    const tab = scrumTabs.find(t => t.id === tabId);
    if (!tab) return { total: 0, answered: 0 };
    
    const total = tab.antipatterns.reduce((sum, anti) => sum + anti.questions.length, 0);
    const answered = tab.antipatterns.reduce((sum, anti) => {
      return sum + anti.questions.filter(q => answers[q.id] !== null && answers[q.id] !== undefined).length;
    }, 0);
    
    return { total, answered };
  };

  const isAntipatternDetected = (antipattern: any) => {
    const userAnswers = antipattern.questions.map((q: any) => answers[q.id]);
    if (userAnswers.some((answer: any) => answer === null || answer === undefined)) {
      return null;
    }
    return JSON.stringify(userAnswers) === JSON.stringify(antipattern.expectedAnswers);
  };

  const getResultBadge = (antipattern: any) => {
    const detected = isAntipatternDetected(antipattern);
    if (detected === null) {
      return (
        <Badge variant="secondary" className="flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          Incomplete
        </Badge>
      );
    }
    if (detected) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <Target className="w-3 h-3" />
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

  const currentTab = scrumTabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Detection & Mapping of Antipatterns (DMAP)</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Identify potential antipatterns in your Scrum implementation and discover their relation to broader project management issues.
            </p>
          </div>
          
          <div className="mt-8 max-w-md mx-auto space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium">Evaluation progress</span>
              <span>{progress}% Completed</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-center text-sm text-muted-foreground">
              {Object.values(answers).filter(a => a !== null && a !== undefined).length} of {scrumTabs.reduce((sum, tab) => sum + tab.antipatterns.reduce((antiSum, anti) => antiSum + anti.questions.length, 0), 0)} questions answered
            </div>
          </div>
          
          {hasAnswers && (
            <div className="mt-6 text-center">
              <Badge variant="secondary" className="flex items-center gap-1 mx-auto w-fit">
                <AlertTriangle className="w-4 h-4" />
                {detectedCount} detected antipatterns
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users2 className="w-5 h-5" />
                  Scrum Stages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {scrumTabs.map((tab) => {
                  const stats = getTabStats(tab.id);
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-primary text-primary-foreground shadow-sm' 
                          : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{tab.name}</div>
                          <div className="text-xs opacity-75 mt-1">
                            {stats.answered}/{stats.total} answered
                          </div>
                        </div>
                        <div className="text-xs">
                          {tab.antipatterns.length} items
                        </div>
                      </div>
                    </button>
                  );
                })}
                
                {hasAnswers && (
                  <button
                    onClick={() => setActiveTab('results')}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      activeTab === 'results'
                        ? 'bg-success text-success-foreground shadow-sm'
                        : 'hover:bg-success/10 text-success hover:text-success/80 border border-success/20'
                    }`}
                  >
          <div className="font-medium text-sm">Detected antipatterns</div>
        <div className="text-xs opacity-75 mt-1">View results</div>
                  </button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'results' ? (
              <ResultsTab answers={answers} comments={comments} />
            ) : currentTab ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-primary" />
                      <div>
                        <CardTitle className="text-xl">{currentTab.name}</CardTitle>
                        <p className="text-muted-foreground mt-1">
                          Review {currentTab.antipatterns.length} potential antipatterns in this stage of your Scrum process.
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {currentTab.antipatterns.map((antipattern) => (
                  <Card key={antipattern.id} className="transition-all duration-300 hover:shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start gap-4">
                        <CardTitle className="text-lg font-bold text-foreground">
                          {antipattern.name}
                        </CardTitle>
                        {getResultBadge(antipattern)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {antipattern.questions.map((question, index) => (
                        <div key={question.id} className="space-y-3 p-4 rounded-lg bg-muted/30">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                              {index + 1}
                            </div>
                            <p className="text-sm font-medium text-foreground leading-relaxed flex-1">
                              {question.text}
                            </p>
                          </div>
                          
                          <div className="ml-9 space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="flex gap-2">
                                <Button
                                  variant={answers[question.id] === true ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleAnswerChange(question.id, true)}
                                  className="min-w-[60px]"
                                >
                                  Yes
                                </Button>
                                <Button
                                  variant={answers[question.id] === false ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handleAnswerChange(question.id, false)}
                                  className="min-w-[60px]"
                                >
                                  No
                                </Button>
                              </div>
                              
                                <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleComment(question.id)}
                                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                              >
                                <MessageSquare className="w-4 h-4" />
                                Add comment
                              </Button>
                            </div>

                            {showComments[question.id] && (
                              <div>
                                <Textarea
                                  placeholder="Add an optional comment..."
                                  value={comments[question.id] || ''}
                                  onChange={(e) => handleCommentChange(question.id, e.target.value)}
                                  className="min-h-[80px] resize-none"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
