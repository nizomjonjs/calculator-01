import Calculator from "@/components/Calculator";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Calculator</h1>
          <p className="text-muted-foreground">Simple and elegant calculator</p>
        </div>
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
