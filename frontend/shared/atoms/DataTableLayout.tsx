import { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/atoms/card";

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
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>

          <CardDescription>{description}</CardDescription>
        </div>

        {toolbar ? <div className="w-full min-w-0 lg:w-auto">{toolbar}</div> : null}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default memo(DataTableLayout);
