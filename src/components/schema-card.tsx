import { LayersIcon, Pencil2Icon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ISchemaCardProps {
  id: string;
  name: string;
}

export function SchemaCard({ id, name }: ISchemaCardProps) {
  return (
    <Link href={`/app/schemas/${id}`}>
      <Card className='hover:bg-gray-900 transition-colors duration-200'>
        <CardHeader className='grid grid-cols-[1fr_110px] items-start gap-4 space-y-0'>
          <div className='space-y-1'>
            <CardTitle>{name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className='flex items-center space-x-2 text-sm text-muted-foreground'>
            <LayersIcon className='h-4 w-4' />
            <span>Database: PostgreSQL</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
