import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, FileText, Table, Code } from 'lucide-react';
import { scrumTabs, managementMappings, ManagementAntipattern } from '@/data/antipatterns';
import jsPDF from 'jspdf';

interface ResultsTabProps {
  answers: Record<string, boolean | null>;
  comments: Record<string, string>;
}

interface DetectedAntipattern {
  tabName: string;
  antipatternName: string;
  antipatternId: string;
  managementAntipatterns: ManagementAntipattern[];
  comment?: string;
}

export const ResultsTab = ({ answers, comments }: ResultsTabProps) => {
  const detectedAntipatterns = useMemo(() => {
    const detected: DetectedAntipattern[] = [];

scrumTabs.forEach(tab => {
  tab.antipatterns.forEach(antipattern => {
    const userAnswers = antipattern.questions.map(q => answers[q.id]);
    const hasAllAnswers = userAnswers.every(answer => answer !== null && answer !== undefined);

    if (hasAllAnswers && JSON.stringify(userAnswers) === JSON.stringify(antipattern.expectedAnswers)) {
      // 🔽 join non-empty comments
      const combinedComment = antipattern.questions
        .map(q => comments[q.id])
        .filter(Boolean) // solo los que no estén vacíos
        .join('\n\n');

      detected.push({
        tabName: tab.name,
        antipatternName: antipattern.name,
        antipatternId: antipattern.id,
        managementAntipatterns: managementMappings[antipattern.id] || [],
        comment: combinedComment // <-- nuevo
      });
    }
  });
});

    
    return detected;
  }, [answers]);

  const getRelationshipBadge = (strength: string) => {
    const variants = {
  'N': { label: 'N: Not linked', variant: 'secondary' as const },
  'P': { label: 'P: Weak relationship', variant: 'outline' as const },
  'L': { label: 'L: Moderate relationship', variant: 'default' as const },
  'F': { label: 'F: Strong relationship', variant: 'destructive' as const }
};

    
    const config = variants[strength as keyof typeof variants] || variants.N;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };


const exportToPDF = () => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.width;
  const margin = 20;
  let yPosition = margin;

  // Configurar fuente
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  
  // Title
  pdf.text('Scrum Antipatterns Evaluation', margin, yPosition);
  yPosition += 15;
  
  pdf.setFontSize(12);
  pdf.text(`Date: ${new Date().toLocaleDateString('en-GB')}`, margin, yPosition);
  yPosition += 10;
  
  pdf.text(`Detected antipatterns: ${detectedAntipatterns.length}`, margin, yPosition);
  yPosition += 20;

  // Detected antipatterns
  detectedAntipatterns.forEach((antipattern, index) => {
    if (yPosition > 250) {
      pdf.addPage();
      yPosition = margin;
    }

    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.text(`${index + 1}. ${antipattern.antipatternName}`, margin, yPosition);
    yPosition += 8;
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.text(`Categoría: ${antipattern.tabName}`, margin + 5, yPosition);
    yPosition += 12;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(11);
  pdf.text('Related management antipatterns:', margin + 5, yPosition);
    yPosition += 8;

    antipattern.managementAntipatterns.forEach((mgmt, mgmtIndex) => {
      if (yPosition > 240) {
        pdf.addPage();
        yPosition = margin;
      }

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      
          const strengthLabels = {
            'N': 'Not linked',
            'P': 'Weak relationship', 
            'L': 'Moderate relationship',
            'F': 'Strong relationship'
          };
      
      pdf.text(`• ${mgmt.name} (${strengthLabels[mgmt.relationshipStrength as keyof typeof strengthLabels]})`, margin + 10, yPosition);
      yPosition += 6;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      
      const justificationLines = pdf.splitTextToSize(mgmt.justification, pageWidth - margin * 2 - 15);
      justificationLines.forEach((line: string) => {
        if (yPosition > 280) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin + 15, yPosition);
        yPosition += 5;
      });
      yPosition += 3;
    });

      // Evaluator comment (new block)
    if (antipattern.comment) {
      if (yPosition > 260) {
        pdf.addPage();
        yPosition = margin;
      }

  pdf.setFont('helvetica', 'italic');
  pdf.setFontSize(10);
  pdf.text('Evaluator comment(s):', margin + 5, yPosition);
      yPosition += 6;

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(9);
      const commentLines = pdf.splitTextToSize(antipattern.comment, pageWidth - margin * 2 - 10);
      commentLines.forEach((line: string) => {
        if (yPosition > 280) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin + 10, yPosition);
        yPosition += 5;
      });

      yPosition += 5;
    }

    yPosition += 10;
  });

  pdf.save(`scrum-antipatterns-${new Date().toISOString().split('T')[0]}.pdf`);
};


  if (detectedAntipatterns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
          <FileText className="w-8 h-8 text-success" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Great job!</h3>
        <p className="text-muted-foreground max-w-md">
          No Scrum antipatterns were detected based on the provided answers.
          Your team appears to be following good agile practices.
        </p>
      </div>
    );
  }

  return (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Detected Antipatterns</h2>
        <p className="text-muted-foreground mt-1">
          {detectedAntipatterns.length} antipatterns were detected in your assessment
        </p>
      </div>

      <div className="flex gap-2">
        <Button onClick={exportToPDF} variant="outline" size="sm">
          <FileText className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>
    </div>

    <div className="space-y-4">
      {detectedAntipatterns.map((detected, index) => (
        <Card key={index} className="border-l-4 border-l-destructive">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg text-destructive">
                  {detected.antipatternName}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  Category: {detected.tabName}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">
                Related management antipatterns:
              </h4>

              {detected.managementAntipatterns.map((mgmt, mgmtIndex) => (
                <div key={mgmtIndex} className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h5 className="font-medium text-foreground">{mgmt.name}</h5>
                    {getRelationshipBadge(mgmt.relationshipStrength)}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {mgmt.justification}
                  </p>
                </div>
              ))}

              {detected.comment && (
                <div className="bg-muted/20 p-3 rounded-md mt-4">
                  <p className="text-sm font-semibold mb-1 text-foreground">Evaluator comment(s):</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {detected.comment}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);
};