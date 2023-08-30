import { LayersIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface ISchemaCardProps {
  id: string;
  name: string;
}

export function SchemaCard({ id, name }: ISchemaCardProps) {
  return (
    <Link href={`/app/schemas/${id}`}>
      <Card className='group hover:bg-gray-900 transition-colors duration-200'>
        <CardHeader className='w-full'>
          <div className='space-y-1 flex items-center justify-between w-full'>
            <CardTitle>{name}</CardTitle>
            <CaretRightIcon className='h-5 w-5 text-muted-foreground !my-0 group-hover:text-white duration-200 group-hover:translate-x-1 group-hover:scale-110 transition-transform' />
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
