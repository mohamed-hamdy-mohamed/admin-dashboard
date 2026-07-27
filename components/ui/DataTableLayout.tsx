import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DataTableLayoutProps {
  title: string;
  description: string;
  toolbar?: React.ReactNode;
  children: React.ReactNode;
}

const DataTableLayout = ({
  title,
  description,
  toolbar,
  children,
}: DataTableLayoutProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <CardTitle>{title}</CardTitle>

          <CardDescription>{description}</CardDescription>
        </div>

        {toolbar}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default DataTableLayout;
