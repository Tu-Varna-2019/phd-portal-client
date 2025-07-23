export const HomeConstants = () => {
  const examLabelStuct = [
    {
      name: 2,
      value: 0,
      color: "hsl(220, 25%, 65%)"
    },
    {
      name: 3,
      value: 0,
      color: "hsl(220, 25%, 65%)"
    },
    {
      name: 4,
      value: 0,
      color: "hsl(220, 25%, 45%)"
    },
    {
      name: 5,
      value: 0,
      color: "hsl(220, 25%, 45%)"
    },
    {
      name: 6,
      value: 0,
      color: "hsl(220, 25%, 45%)"
    }
  ];

  const examPieChartStruct = [
    { label: 2, value: 0 },
    { label: 3, value: 0 },
    { label: 4, value: 0 },
    { label: 5, value: 0 },
    { label: 6, value: 0 }
  ];

  return {
    examLabelStuct,
    examPieChartStruct
  };
};
