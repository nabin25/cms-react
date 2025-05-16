import { Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { cn } from "../../lib/utils";
import type { IAuthor } from "../../types/author";

const AuthorCard = ({ authorData }: { authorData: IAuthor }) => {
  return (
    <Card className={cn("w-[350px] h-[300px]")}>
      <CardHeader>
        <div className="flex justify-between place-items-center">
          <img
            className="w-14 aspect-square rounded-full"
            src={authorData.avatar}
            alt={authorData.name}
          />
          <CardTitle>{authorData?.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <p className="mb-2">
            Member since{" "}
            <strong>{new Date(authorData.created_at)?.toDateString()}</strong>
          </p>

          <p>
            <Pencil className="inline w-4" /> <strong>Bio</strong>
          </p>
          <p className="line-clamp-4">{authorData?.bio}</p>
        </CardDescription>
      </CardContent>
    </Card>
  );
};
export default AuthorCard;
