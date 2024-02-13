import { cookies } from "next/headers";
import ptBr from "dayjs/locale/pt-br";
import dayjs from "dayjs";

dayjs.locale(ptBr);

import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface IMemory {
  id: string;
  coverUrl: string;
  expert: string;
  createdAt: string;
}

export default async function Home() {
  const token = cookies().get("token")?.value;

  if (!token) return <EmptyMemories />;

  const response = await api.get<IMemory[]>("/memories", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const memories = response.data;

  if (memories.length === 0) return <EmptyMemories />;

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((m) => {
        return (
          <div key={m.id} className="space-y-4">
            <time className="flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50">
              {dayjs(m.createdAt).format("D[ de ]MMMM[, ]YYYY")}
            </time>
            <Image 
              src={m.coverUrl}
              alt=""
              width={592}
              height={280}
              quality={100}
              className="w-full aspect-video object-cover rounded-lg"
            />
            <p className="text-lg leading-relaxed text-gray-100 line-clamp-5">
              {m.expert}
            </p>
            <Link href={`/memories/${m.id}`} className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100">
              Ler mais
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
